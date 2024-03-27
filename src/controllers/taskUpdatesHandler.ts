import { env } from "../typeDefinitions/default.types";
import JSONResponse from "../utils/JsonResponse";
import * as response from "../constants/responses";
import { verifyNodejsBackendAuthToken } from "../utils/verifyAuthToken";

export const sendTaskUpdatesHandler = async (request: any, env: env) => {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return new JSONResponse(response.BAD_SIGNATURE);
    }
    await verifyNodejsBackendAuthToken(authHeader, env);
    const update: string = await request.json();
    // await sendTaskUpdate(update);
    return new JSONResponse(
      "updates send on discord tracking updates channel."
    );
  } catch (error) {
    return new JSONResponse(response.BAD_SIGNATURE);
  }
};
