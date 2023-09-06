import { FAILED_TO_FETCH_TASKS } from "../constants/responses";
import { RDS_BASE_API_URL } from "../constants/urls";
import { TasksResponseType } from "../typeDefinitions/task.types";

async function fetchTasks(assignee: string, status: string) {
  const url = `${RDS_BASE_API_URL}/tasks?status=${status}&assignee=${assignee}&dev=true`;
  const response = await fetch(url);
  const responseData: TasksResponseType = await response.json();

  if (!response.ok) {
    throw new Error(FAILED_TO_FETCH_TASKS.replace("{{assignee}}", assignee));
  }
  return responseData;
}

export { fetchTasks };
