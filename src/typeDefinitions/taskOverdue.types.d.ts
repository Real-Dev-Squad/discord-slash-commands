export interface TaskOverdue {
  id: string;
  percentCompleted: number;
  endsOn: number;
  createdBy: string;
  assignee: string;
  title: string;
  type: string;
  priority: string;
  startedOn: number;
  status: string;
  assigneeId: string;
}

export interface TaskOverdueResponse {
  message: string;
  tasks: Array<TaskOverdue>;
}
