export interface UserBackend {
  message: string;
  user: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: number;
    yoe: number;
    company: string;
    designation: string;
    img: string;
    github_id: string;
    linkedin_id: string;
    discordId: string;
    twitter_id: string;
    instagram_id: string;
    website: string;
    github_display_name: string;
    isMember: boolean;
    userType: string;
    badges: [];
  };
}
