export type UserType = {
  id: string;
  profileURL?: string;
  discordJoinedAt?: string;
  roles: {
    archived: boolean;
    in_discord: boolean;
    member?: boolean;
  };
  created_at?: number;
  yoe?: number;
  github_created_at?: number;
  updated_at: number;
  company?: string;
  twitter_id?: string;
  first_name: string;
  incompleteUserDetails: boolean;
  website?: string;
  discordId?: string;
  last_name: string;
  linkedin_id?: string;
  picture?: {
    publicId: string;
    url: string;
  };
  instagram_id?: string;
  github_display_name?: string;
  github_id?: string;
  designation?: string;
  username: string;
  profileStatus?: string;
};

export type UserResponseType = {
  message: string;
  users?: UserType[];
  user?: UserType[];

};

export type userListResponseType = {
  message: string;
  count: number;
  users: string[];
};
