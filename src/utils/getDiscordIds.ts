import { RDS_BASE_STAGING_API_URL } from "../constants/urls";

export const getDiscordIds = async (userIds: string[]) => {
  try {
    const url = `${RDS_BASE_STAGING_API_URL}/users/userId`;

    const numberOfBatches = Math.ceil(userIds.length / 6);

    const batchCollection = [];

    //for storing the data returned
    const responseCollection: any = [];

    let indexCollection = 0;
    let numberOfFetchCalls = 0;

    //adding all batch
    for (let i = 0; i < numberOfBatches; i++) {
      const batch: Promise<any>[] = [];
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
      const json = responses.map((response) => response.json());
      const data = await Promise.all(json);

      responseCollection.push(data);
    }

    return responseCollection;
  } catch (e) {
    console.log(e);
  }
};
