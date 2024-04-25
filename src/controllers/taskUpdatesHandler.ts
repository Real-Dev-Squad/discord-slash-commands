import { env } from "../typeDefinitions/default.types";
import JSONResponse from "../utils/JsonResponse";
import * as response from "../constants/responses";
import { verifyNodejsBackendAuthToken } from "../utils/verifyAuthToken";
import { sendTaskUpdate } from "../utils/sendTaskUpdates";
import { TaskUpdates } from "../typeDefinitions/taskUpdate";
import { IRequest } from "itty-router";

export const sendTaskUpdatesHandler = async (request: IRequest, env: env) => {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return new JSONResponse(response.UNAUTHORIZED, { status: 401 });
  }
  try {
    await verifyNodejsBackendAuthToken(authHeader, env);
    const updates: TaskUpdates = await request.json();
    const { completed, planned, blockers, discordId, taskId } = updates.content;
    await sendTaskUpdate(completed, planned, blockers, discordId, taskId, env);
    return new JSONResponse(
      "Task update sent on Discord's tracking-updates channel."
    );
  } catch (error: any) {
    return new JSONResponse({
      res: response.INTERNAL_SERVER_ERROR,
      message: error.message,
      status: 500,
    });
  }
};
