export interface TaskOverdue {
  id: string;
  title: string;
  type: string;
  endsOn: string;
  startedOn: string;
  status: string;
  assignee?: string;
  assigneeId: string;
  percentCompleted: number;
  dependsOn: string[];
  participants?: string[];
  isNoteworthy: boolean;
  createdBy: string;
}

export interface TaskOverdueResponse {
  message: string;
  tasks: TaskOverdue[];
  next?: string;
  prev?: string;
}
