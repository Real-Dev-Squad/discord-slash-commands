export interface TaskUpdates {
  content: {
    completed: string;
    planned: string;
    blockers: string;
    discordId: string;
    taskId: string;
  };
}
