export type task = {
  id: string;
  title: string;
  purpose: string;
  featureUrl: string;
  type: string;
  links: string[];
  endsOn: number;
  startedOn: string;
  status: string;
  assignee?: string;
  percentCompleted: number;
  dependsOn: string[];
  participants?: string[];
  completionAward: award;
  lossRate: award;
  isNoteworthy: boolean;
  createdBy: string;
  github?: {
    issue: {
      assignee?: string;
      status: string;
      id: number;
      closedAt?: string;
      assigneeRdsInfo?: {
        firstName: string | null | undefined;
        lastName: string | null | undefined;
        username: string;
      };
    };
  };
};

export type TasksResponseType = {
  message?: string;
  tasks: task[];
  next?: string;
  prev?: string;
};
