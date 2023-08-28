import { TasksResponseType } from "../typeDefinitions/task.types";
import { formatDate } from "./formatDate";

export function formatTask(task: TasksResponseType["tasks"][0]) {
  return `
      **Title:** ${task.title}
      **Progress:** ${task.percentCompleted}%
      **Ends On:** ${formatDate(task.endsOn)}
      **See more:** [Task Details](https://status.realdevsquad.com/tasks/${
        task.id
      })\n`;
}
