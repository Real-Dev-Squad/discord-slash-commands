import JSONResponse from "./JsonResponse";
import { addDelay, convertSecondsToMillis } from "./timeUtils";
export const DISCORD_HEADERS = {
  RATE_LIMIT_RESET_AFTER: "X-RateLimit-Reset-After",
  RATE_LIMIT_REMAINING: "X-RateLimit-Remaining",
  RETRY_AFTER: "Retry-After",
};

const MAX_RETRY = 1;

interface RequestDetails {
  retries: number;
  request: () => Promise<Response>;
  index: number;
}
interface ResponseDetails {
  response: Response;
  data: RequestDetails;
}

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
    let rateLimitRemaining: number | null = null;
    let retryAfter: number | null = null;
    const handleResponse = async (
      response: JSONResponse,
      data: RequestDetails
    ): Promise<void> => {
      if (response.ok) {
        resetAfter = Number.parseFloat(
          response.headers.get(DISCORD_HEADERS.RATE_LIMIT_RESET_AFTER) || "0"
        );
        rateLimitRemaining = Number.parseInt(
          response.headers.get(DISCORD_HEADERS.RATE_LIMIT_REMAINING) || "0"
        );
        responseList[data.index] = response;
      } else {
        retryAfter = Number.parseFloat(
          response.headers.get(DISCORD_HEADERS.RETRY_AFTER) || "0"
        );
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
        response = new JSONResponse({ error: e }, { status: 500 });
      }
      return { response, data };
    };

    let promises: Promise<{ response: Response; data: RequestDetails }>[] = [];

    while (requestsQueue.length > 0) {
      const requestData = requestsQueue.pop();
      if (!requestData) continue;
      promises.push(executeRequest(requestData));
      if (rateLimitRemaining) {
        rateLimitRemaining--;
      }
      if (
        !rateLimitRemaining ||
        rateLimitRemaining <= 0 ||
        requestsQueue.length === 0
      ) {
        const resultList: ResponseDetails[] = await Promise.all(promises);
        promises = [];
        for (const result of resultList) {
          const { response, data } = result;
          await handleResponse(response, data);
        }
        if (rateLimitRemaining && rateLimitRemaining <= 0 && resetAfter) {
          await addDelay(convertSecondsToMillis(resetAfter));
          rateLimitRemaining = null;
        } else if (retryAfter && retryAfter > 0) {
          await addDelay(convertSecondsToMillis(retryAfter));
          retryAfter = null;
        }
      }
    }

    return responseList;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
