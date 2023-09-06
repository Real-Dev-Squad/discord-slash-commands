import { RDS_BASE_API_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";
import { TasksResponseType } from "../typeDefinitions/task.types";
import { formatTask, generateTaskResponseMessage } from "../utils/formatTask";
import { discordTextResponse } from "../utils/discordResponse";
import { getNickName } from "../utils/getNickName";
import {
  FAILED_TO_FETCH_TASKS,
  INVALID_NICKNAME_ERROR,
  NO_TASKS_FOUND,
  TASKS_FETCH_FAILED,
} from "../constants/responses";

async function fetchTasks(assignee: string, status: string) {
  const url = `${RDS_BASE_API_URL}/tasks?status=${status}&assignee=${assignee}&dev=true`;
  const response = await fetch(url);
  const responseData: TasksResponseType = await response.json();

  if (!response.ok) {
    throw new Error(FAILED_TO_FETCH_TASKS.replace("{{assignee}}", assignee));
  }
  return responseData;
}

export async function taskCommand(userId: string, env: env) {
  try {
    const nickName = await getNickName(userId, env);
    if (nickName === null) {
      return discordTextResponse(INVALID_NICKNAME_ERROR);
    }
    const status = "IN_PROGRESS";
    const tasksData = await fetchTasks(nickName, status);

    if (!tasksData.tasks) {
      const errorMessage = NO_TASKS_FOUND.replace("{{nickName}}", nickName);
      return discordTextResponse(errorMessage);
    }

    const formattedTasks = tasksData.tasks.map(
      (task: TasksResponseType["tasks"][0]) => formatTask(task)
    );

    const responseMessage = generateTaskResponseMessage(
      nickName,
      formattedTasks,
      status
    );

    return discordTextResponse(responseMessage);
  } catch (error: any) {
    console.error(error.message);
    return discordTextResponse(TASKS_FETCH_FAILED);
  }
}
