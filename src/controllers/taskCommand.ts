import { env } from "../typeDefinitions/default.types";
import { TasksResponseType } from "../typeDefinitions/task.types";
import { formatTask, generateTaskResponseMessage } from "../utils/formatTask";
import { discordTextResponse } from "../utils/discordResponse";
import { fetchTasks } from "../utils/fetchTasks";
import { getNickName } from "../utils/getNickName";
import {
  INVALID_NICKNAME_ERROR,
  NO_TASKS_FOUND,
  TASKS_FETCH_FAILED,
} from "../constants/responses";

export async function taskCommand(userId: string, env: env) {
  const status = "IN_PROGRESS";
  try {
    const nickName = await getNickName(userId, env);
    if (nickName === null) {
      return discordTextResponse(INVALID_NICKNAME_ERROR);
    }
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
