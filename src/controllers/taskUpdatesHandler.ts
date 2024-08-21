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
    const { content } = await request.json();
    const {
      completed,
      planned,
      blockers,
      userName,
      taskId,
      taskTitle,
    }: TaskUpdates = content;
    await sendTaskUpdate(
      { completed, planned, blockers, userName, taskId, taskTitle },
      env
    );
    return new JSONResponse(response.TASK_UPDATE_SENT_MESSAGE);
  } catch (error: any) {
    return new JSONResponse({
      res: response.INTERNAL_SERVER_ERROR,
      message: error.message,
      status: 500,
    });
  }
};
