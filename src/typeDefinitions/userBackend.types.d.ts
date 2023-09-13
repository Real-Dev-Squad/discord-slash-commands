export interface UserBackend {
  message: string;
  user: {
    id: string;
    discordJoinedAt: string;
    discordId: string;
    github_display_name: string;
    github_id: string;
    username: string;
    first_name: string;
    last_name: string;
    roles: {
      in_discord: boolean;
      super_user: boolean;
      archived: boolean;
    };
    incompleteUserDetails: boolean;
    state: string;
  };
}
