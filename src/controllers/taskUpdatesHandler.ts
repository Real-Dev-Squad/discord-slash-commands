import { env } from "../typeDefinitions/default.types";
import JSONResponse from "../utils/JsonResponse";
import * as response from "../constants/responses";
import { verifyNodejsBackendAuthToken } from "../utils/verifyAuthToken";
import { sendTaskUpdate } from "../utils/sendTaskUpdates";
import { TaskUpdates } from "../typeDefinitions/taskUpdate";

export const sendTaskUpdatesHandler = async (request: Request, env: env) => {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return new JSONResponse(response.UNAUTHORIZED, { status: 401 });
    }
    await verifyNodejsBackendAuthToken(authHeader, env);
    const updates: TaskUpdates = await request.json();
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
