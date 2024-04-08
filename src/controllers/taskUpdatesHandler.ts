import { env } from "../typeDefinitions/default.types";
import JSONResponse from "../utils/JsonResponse";
import * as response from "../constants/responses";
import { verifyNodejsBackendAuthToken } from "../utils/verifyAuthToken";
import { sendTaskUpdate } from "../utils/sendTaskUpdates";

export const sendTaskUpdatesHandler = async (request: any, env: env) => {
  try {
    const authHeader = request.headers.get("Authorization");
    console.log(authHeader);
    if (!authHeader) {
      return new JSONResponse(response.BAD_SIGNATURE, { status: 401 });
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
  } catch (error: any) {
    return new JSONResponse({
      res: response.INTERNAL_SERVER_ERROR,
      message: error.message,
      status: 500,
    });
  }
};
