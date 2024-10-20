export type UserArray = {
  user: {
    id: string;
  };
  roles: string[];
};

export type MentionEachUserOptions = {
  name: string;
  type: number;
  value: string;
};
export type DevFlag = {
  name: string;
  type: number;
  value: boolean;
};
