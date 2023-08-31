import { RDS_BASE_API_URL } from "../constants/urls";
import { UserBackend } from "../typeDefinitions/userBackend.types";
import * as response from "../constants/responses";

export const getDiscordIds = async (
  userIds: string[] | string
): Promise<string[] | string> => {
  try {
    const url = `${RDS_BASE_API_URL}/users/userId`;

    const numberOfBatches = Math.ceil(userIds.length / 6);

    const fetchCollection = [] as Array<Promise<Response>[]>;

    //for storing the data returned
    const fetchResponseCollection = [] as Array<UserBackend[]>;

    let indexCollection = 0;
    let numberOfFetchCalls = 0;

    const discordIds = [] as Array<string>;

    //adding all batch
    for (let i = 0; i < numberOfBatches; i++) {
      const batch: Promise<Response>[] = [];
      fetchCollection.push(batch);
    }

    //CF workers only allow 6 outgoing simultaneous request, so in order to retrieve all the data
    //we are making fetch calls in the batches of 6

    for (let i = 0; i < userIds.length; i++) {
      fetchCollection[indexCollection].push(fetch(`${url}/${userIds[i]}`));
      numberOfFetchCalls++;

      if (numberOfFetchCalls == 6) {
        indexCollection++;
        numberOfFetchCalls = 0;
      }
    }

    //now we will make parallel requests in the batches of 6.
    //and extract the data in response array

    for (let i = 0; i < numberOfBatches; i++) {
      const responses = await Promise.all(fetchCollection[i]);
      const json: Promise<UserBackend>[] = responses.map((response) =>
        response.json()
      );
      const data = await Promise.all(json);

      fetchResponseCollection.push(data);
    }

    //data contains arrays of User objects
    //we are looping over nested arrays and extracting discordIds

    fetchResponseCollection.forEach((dataArray: UserBackend[]) => {
      dataArray.forEach((data: UserBackend) => {
        if (data.user.discordId) {
          discordIds.push(data.user.discordId);
        }
      });
    });

    return discordIds;
  } catch (e) {
    return response.INTERNAL_SERVER_ERROR;
  }
};
