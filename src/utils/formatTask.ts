import { TasksResponseType } from "../typeDefinitions/task.types";
import { formatDate } from "./formatDate";
import { RDS_STATUS_SITE_URL } from "../constants/urls";
import { formatStatusToTitleCase } from "./formatStatusToTitleCase";

export function formatTask(task: TasksResponseType["tasks"][0]) {
  return `
      **Title:** ${task.title}
      **Progress:** ${task.percentCompleted}%
      **Ends On:** ${formatDate(task.endsOn)}
      **More details:** [Task Details](${RDS_STATUS_SITE_URL}/tasks/${
    task.id
  })`;
}

export function generateTaskResponseMessage(
  nickName: string,
  formattedTasks: string[],
  status: string
) {
  const responseMessage = `
## ${formatStatusToTitleCase(status)} Tasks of ${nickName}
${formattedTasks.join("\n")}

 [→ All Tasks](${RDS_STATUS_SITE_URL}/tasks?q=status:all+assignee:${nickName})
`;
  return responseMessage;
}
