import JSONResponse from "./JsonResponse";
import { addDelay, convertSecondsToMillis } from "./timeUtils";
export const DISCORD_HEADERS = {
  RATE_LIMIT_RESET_AFTER: "X-RateLimit-Reset-After",
  RATE_LIMIT_REMAINING: "X-RateLimit-Remaining",
  RETRY_AFTER: "Retry-After",
};

const MAX_RETRY = 1;
const LIMIT_BUFFER = 0.2;

interface RequestDetails {
  retries: number;
  request: () => Promise<Response>;
  index: number;
}
interface ResponseDetails {
  response: Response;
  data: RequestDetails;
}

export const parseRateLimitRemaining = (response: Response) => {
  let rateLimitRemaining = Number.parseInt(
    response.headers.get(DISCORD_HEADERS.RATE_LIMIT_REMAINING) || "0"
  );
  rateLimitRemaining = Math.floor(rateLimitRemaining * (1 - LIMIT_BUFFER));
  return rateLimitRemaining;
};

export const parseResetAfter = (response: Response) => {
  let resetAfter = Number.parseFloat(
    response.headers.get(DISCORD_HEADERS.RATE_LIMIT_RESET_AFTER) || "0"
  );
  resetAfter = Math.ceil(resetAfter);
  return resetAfter;
};

export const batchDiscordRequests = async (
  requests: { (): Promise<Response> }[]
): Promise<Response[]> => {
  try {
    const requestsQueue: RequestDetails[] = requests.map((request, index) => {
      return {
        retries: 0,
        request: request,
        index: index,
      };
    });

    const responseList: Response[] = new Array(requestsQueue.length);
    let resetAfter = 0;
    let nextMinimumResetAfter = Infinity;
    let rateLimitRemaining = 1;
    let nextMinimumRateLimitRemaining = Infinity;

    const handleResponse = async (
      response: JSONResponse,
      data: RequestDetails
    ): Promise<void> => {
      if (response.ok) {
        nextMinimumResetAfter = Math.min(
          nextMinimumResetAfter,
          parseResetAfter(response)
        );
        nextMinimumRateLimitRemaining = Math.min(
          nextMinimumRateLimitRemaining,
          parseRateLimitRemaining(response)
        );

        responseList[data.index] = response;
      } else {
        nextMinimumResetAfter = Math.min(
          nextMinimumResetAfter,
          parseResetAfter(response)
        );
        rateLimitRemaining = 0;
        if (data.retries >= MAX_RETRY) {
          responseList[data.index] = response;
        } else {
          data.retries++;
          requestsQueue.push(data);
        }
      }
    };

    const executeRequest = async (
      data: RequestDetails
    ): Promise<{ response: Response; data: RequestDetails }> => {
      let response;
      try {
        response = await data.request();
      } catch (e: unknown) {
        console.error(`Error executing request at index ${data.index}:`, e);
        response = new JSONResponse({ error: e }, { status: 500 });
      }
      return { response, data };
    };

    let promises: Promise<{ response: Response; data: RequestDetails }>[] = [];

    while (requestsQueue.length > 0) {
      const requestData = requestsQueue.pop();
      if (!requestData) continue;
      promises.push(executeRequest(requestData));
      rateLimitRemaining--;

      if (rateLimitRemaining <= 0 || requestsQueue.length === 0) {
        const resultList: ResponseDetails[] = await Promise.all(promises);
        promises = [];
        for (const result of resultList) {
          const { response, data } = result;
          await handleResponse(response, data);
        }
        if (nextMinimumRateLimitRemaining !== Infinity) {
          rateLimitRemaining = nextMinimumRateLimitRemaining;
        }
        if (nextMinimumResetAfter !== Infinity) {
          resetAfter = nextMinimumResetAfter;
        }
        nextMinimumRateLimitRemaining = Infinity;
        nextMinimumResetAfter = Infinity;
        if (rateLimitRemaining <= 0 && resetAfter) {
          await addDelay(convertSecondsToMillis(resetAfter));
          rateLimitRemaining = 1;
        }
      }
    }
    return responseList;
  } catch (e) {
    console.error("Error in batchDiscordRequests:", e);
    throw e;
  }
};
