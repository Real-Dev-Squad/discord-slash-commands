import { env } from "../typeDefinitions/default.types";
import { messageRequestDataOptions } from "../typeDefinitions/discordMessage.types";
import { discordTextResponse } from "../utils/discordResponse";

export async function taskCommand(
  options: messageRequestDataOptions,
  env: env
) {
  const response: any = await (
    await fetch(
      `https://api.realdevsquad.com/tasks/${options.value}?size=3&dev=true`
    )
  ).json();

  const tasks = response.tasks;

  let taskdetails: any[] = [];
  for (const task of tasks) {
    taskdetails = [
      ...taskdetails,
      {
        title: task.title,
        Progress: task.percentCompleted,
        status: task.status,
      },
    ];
  }

  return discordTextResponse(
    `tasks:\n \`${JSON.stringify(
      { result: taskdetails.length, taskdetails },
      null,
      2
    )}\``
  );
}
