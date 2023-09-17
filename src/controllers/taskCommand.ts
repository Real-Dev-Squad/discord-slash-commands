import { task } from "../typeDefinitions/task.types";
import { formatTask, generateTaskResponseMessage } from "../utils/formatTask";
import { discordTextResponse } from "../utils/discordResponse";
import { fetchTasks } from "../utils/fetchTasks";
import { getUserDetails } from "../utils/getUserDetails";
import {
  INVALID_NICKNAME_ERROR,
  NO_TASKS_FOUND,
  TASKS_FETCH_FAILED,
} from "../constants/responses";

export async function taskCommand(userId: string) {
  const status = "IN_PROGRESS";
  try {
    const userData = await getUserDetails(userId);
    if (!userData.user) {
      return discordTextResponse(INVALID_NICKNAME_ERROR);
    }
    const username = userData.user.username;
    const tasksData = await fetchTasks(username, status);

    if (!tasksData.tasks) {
      const errorMessage = NO_TASKS_FOUND.replace("{{username}}", username);
      return discordTextResponse(errorMessage);
    }

    const formattedTasks = tasksData.tasks.map((task: task) =>
      formatTask(task)
    );

    const responseMessage = generateTaskResponseMessage(
      username,
      formattedTasks,
      status
    );

    return discordTextResponse(responseMessage);
  } catch (error) {
    console.error(error);
    return discordTextResponse(TASKS_FETCH_FAILED);
  }
}
