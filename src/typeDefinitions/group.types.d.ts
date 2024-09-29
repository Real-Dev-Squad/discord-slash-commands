export type GroupType = {
  id: string;
  date: {
    _seconds: number;
    _nanoseconds: number;
  };
  createdBy: string;
  rolename: string;
  roleid: string;
  description: string;
  memberCount: number;
  isMember: boolean;
};

export type GroupResponseType = {
  message: string;
  groups: GroupType[];
};
