import { env } from "../typeDefinitions/default.types";
import JSONResponse from "../utils/JsonResponse";
import * as response from "../constants/responses";
import { verifyNodejsBackendAuthToken } from "../utils/verifyAuthToken";
import { sendTaskUpdate } from "../utils/sendTaskUpdates";

export const sendTaskUpdatesHandler = async (request: any, env: env) => {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return new JSONResponse(response.BAD_SIGNATURE);
    }
    await verifyNodejsBackendAuthToken(authHeader, env);
    const updates: {
      content: { completed: string; planned: string; blockers: string };
    } = await request.json();
    const { completed, planned, blockers } = updates.content;
    await sendTaskUpdate(completed, planned, blockers, env);
    return new JSONResponse(
      "Task update sent on discord tracking updates channel."
    );
  } catch (error) {
    return new JSONResponse({ res: response.BAD_SIGNATURE, message: error });
  }
};
