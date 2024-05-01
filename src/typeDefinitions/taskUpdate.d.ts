export interface TaskUpdates {
  content: {
    completed: string;
    planned: string;
    blockers: string;
    userName: string;
    taskId: string;
    taskTitle: string;
  };
}
