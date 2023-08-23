export interface UserBackend {
  message: string;
  user: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    github_id: string;
    discordId: string;
    github_display_name: string;
    isMember: boolean;
  };
}
