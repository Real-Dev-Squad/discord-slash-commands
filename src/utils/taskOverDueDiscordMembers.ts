import { RDS_BASE_API_URL } from "../constants/urls";
import {
  TaskOverdue,
  TaskOverdueResponse,
} from "../typeDefinitions/taskOverdue.types";
import * as errors from "../constants/responses";

export const taskOverDueDiscordMembers = async (): Promise<
  string[] | string
> => {
  try {
    const overDueUrl = `${RDS_BASE_API_URL}/tasks?dev=true&status=overdue&size=100`;

    const response: Response = await fetch(overDueUrl);
    const responseObj: TaskOverdueResponse = await response.json();

    const assigneeIds: string[] = responseObj.tasks.map(
      (task: TaskOverdue) => task.assigneeId
    );

    return assigneeIds;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
