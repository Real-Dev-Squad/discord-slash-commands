import { TasksResponseType } from "../typeDefinitions/task.types";
import { RDS_STATUS_SITE_URL } from "../constants/urls";
import { formatStatusToTitleCase } from "./formatStatusToTitleCase";

export function formatTask(task: TasksResponseType["tasks"][0]) {
  const taskTitle = `**Title:** ${task.title}`;
  const taskProgress = `**Progress:** ${task.percentCompleted}%`;
  const taskEndsOn = `**Ends On:** ${new Date(
    task.endsOn * 1000
  ).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}`;
  const taskMoreDetails = `**More details:** [Task Details](${RDS_STATUS_SITE_URL}/tasks/${task.id})`;
  return `${taskTitle}\n${taskProgress}\n${taskEndsOn}\n${taskMoreDetails}`;
}

export function generateTaskResponseMessage(
  nickName: string,
  formattedTasks: string[],
  status: string
) {
  const title = `## ${formatStatusToTitleCase(status)} Tasks of ${nickName}`;
  const tasks = formattedTasks.join("\n\n");
  const allTaskLink = `[→ All Tasks](${RDS_STATUS_SITE_URL}/tasks?q=status:all+assignee:${nickName})
`;
  const responseMessage = `${title}\n${tasks}\n${allTaskLink}`;
  return responseMessage;
}
