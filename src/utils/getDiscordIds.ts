import { RDS_BASE_STAGING_API_URL } from "../constants/urls";
import { UserBackend } from "../typeDefinitions/userBackend.types";
import * as response from "../constants/responses";

export const getDiscordIds = async (
  userIds: string[]
): Promise<UserBackend[][] | string> => {
  try {
    const url = `${RDS_BASE_STAGING_API_URL}/users/userId`;

    const numberOfBatches = Math.ceil(userIds.length / 6);

    const batchCollection = [] as Array<Promise<Response>[]>;

    //for storing the data returned
    const responseCollection = [] as Array<UserBackend[]>;

    let indexCollection = 0;
    let numberOfFetchCalls = 0;

    //adding all batch
    for (let i = 0; i < numberOfBatches; i++) {
      const batch: Promise<Response>[] = [];
      batchCollection.push(batch);
    }

    //CF workers only allow 6 outgoing simultaneous request, so in order to retrieve all the data
    //we are making fetch calls in the batches of 6

    for (let i = 0; i < userIds.length; i++) {
      batchCollection[indexCollection].push(fetch(`${url}/${userIds[i]}`));
      numberOfFetchCalls++;

      if (numberOfFetchCalls == 6) {
        indexCollection++;
        numberOfFetchCalls = 0;
      }
    }

    //now we will make parallel requests in the batches of 6.
    //and extract the data in response array

    for (let i = 0; i < numberOfBatches; i++) {
      const responses = await Promise.all(batchCollection[i]);
      const json: Promise<UserBackend>[] = responses.map((response) =>
        response.json()
      );
      const data = await Promise.all(json);

      responseCollection.push(data);
    }

    return responseCollection;
  } catch (e) {
    return response.INTERNAL_SERVER_ERROR;
  }
};
