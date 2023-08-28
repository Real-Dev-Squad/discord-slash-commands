import { RDS_BASE_API_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";
import {} from "../typeDefinitions/discordMessage.types";
import { TasksResponseType } from "../typeDefinitions/task.types";
import { formatTask } from "../utils/FormatTask";
import { discordTextResponse } from "../utils/discordResponse";
import { formatStatus } from "../utils/formatStatus";
import { getNickName } from "../utils/getNickName";

function fetchTask(assignee: string, status: string) {
  const url = `${RDS_BASE_API_URL}/tasks?status=${status}&assignee=${assignee}&dev=true`;
  const response = fetch(url);
  return response;
}

export async function taskCommand(userId: string, env: env) {
  const nickName = await getNickName(userId, env);
  const status = ["IN_PROGRESS", "VERIFIED"];
  const inProgressResponse = await fetchTask(nickName, status[0]);
  const verifiedResponse = await fetchTask(nickName, status[1]);

  const inProgressTasks: TasksResponseType = await inProgressResponse.json();
  const verifiedTasks: TasksResponseType = await verifiedResponse.json();

  const formattedTasks: string[] = [];

  if (inProgressTasks.tasks.length > 0) {
    formattedTasks.push(`## ${formatStatus(status[0])} Tasks`);
    inProgressTasks.tasks.forEach((task) => {
      formattedTasks.push(formatTask(task));
    });
  } else {
    formattedTasks.push(`No ${formatStatus(status[0])} Tasks`);
  }

  if (verifiedTasks.tasks.length > 0) {
    formattedTasks.push(`## ${formatStatus(status[1])} Tasks`);
    verifiedTasks.tasks.forEach((task) => {
      formattedTasks.push(formatTask(task));
    });
  } else {
    formattedTasks.push(`No ${formatStatus(status[1])} Tasks`);
  }

  if (formattedTasks.length === 0) {
    return discordTextResponse(
      `No tasks found for ${nickName} with status IN_PROGRESS or VERIFIED`
    );
  }

  return discordTextResponse(formattedTasks.join("\n"));
}
