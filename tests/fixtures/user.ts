export const user = {
  id: "iODXB6ns8jaZB9p0XlBw",
  incompleteUserDetails: false,
  discordJoinedAt: "2023-08-08T11:40:42.522000+00:00",
  discordId: "858838385330487336",
  github_display_name: "Sunny Sahsi",
  updated_at: 1694888822719,
  roles: {
    archived: false,
    in_discord: true,
    member: false,
    super_user: false,
    archive: false,
  },
  last_name: "Sahsi",
  github_id: "sahsisunny",
  first_name: "Sunny",
  username: "sunny",
  state: "ACTIVE",
};

export const userResponse = {
  message: "User returned successfully!",
  user: user,
};

export const userNotFoundResponse = {
  statusCode: 404,
  error: "Not Found",
  message: "User doesn't exist",
};
