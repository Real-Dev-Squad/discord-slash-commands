export const user = {
  id: "iODXB6ns8jaZB9p0XlBw",
  incompleteUserDetails: false,
  discordJoinedAt: "2023-08-08T11:40:42.522000+00:00",
  created_at: 1692748800000,
  discordId: "858838385330487336",
  github_display_name: "John Doe",
  updated_at: 1694888822719,
  roles: {
    archived: false,
    in_discord: true,
    member: false,
    super_user: false,
    archive: false,
  },
  last_name: "Doe",
  github_id: "johndoe",
  first_name: "John",
  username: "johndoe",
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

export const users = [
  {
    id: "1",
    website: "example.com",
    incompleteUserDetails: false,
    discordJoinedAt: "2022-01-15T08:30:00.000000+00:00",
    discordId: "123456789",
    roles: {
      archived: false,
      in_discord: true,
      member: true,
    },
    last_name: "Doe",
    linkedin_id: "johndoe",
    picture: {
      publicId: "profile/1/image",
      url: "https://example.com/profile/1/image.jpg",
    },
    yoe: 2,
    instagram_id: "john_doe",
    github_display_name: "John Doe",
    updated_at: 1694609807155,
    github_id: "johndoe123",
    company: "Tech Co",
    designation: "Software Engineer",
    twitter_id: "johndoe_tweets",
    first_name: "John",
    status: "active",
    username: "johndoe",
  },
  {
    id: "2",
    website: "example2.com",
    incompleteUserDetails: false,
    discordJoinedAt: "2022-03-20T12:45:00.000000+00:00",
    discordId: "987654321",
    roles: {
      archived: false,
      in_discord: true,
    },
    last_name: "Smith",
    linkedin_id: "smithy",
    picture: {
      publicId: "profile/2/image",
      url: "https://example.com/profile/2/image.jpg",
    },
    yoe: 3,
    github_display_name: "Smithy",
    updated_at: 1694609807244,
    github_id: "smithy456",
    company: "Tech Solutions",
    designation: "Frontend Developer",
    twitter_id: "smithy_tweets",
    first_name: "Jane",
    username: "janesmith",
  },
  {
    id: "3",
    incompleteUserDetails: false,
    discordJoinedAt: "2022-05-10T16:20:00.000000+00:00",
    discordId: "135792468",
    roles: {
      archived: false,
      in_discord: true,
    },
    last_name: "Brown",
    linkedin_id: "brownie",
    picture: {
      publicId: "profile/3/image",
      url: "https://example.com/profile/3/image.jpg",
    },
    yoe: 1,
    github_display_name: "Brownie",
    updated_at: 1694609807265,
    github_id: "brownie789",
    company: "Tech Innovators",
    designation: "UI/UX Designer",
    twitter_id: "brownie_designs",
    first_name: "Emily",
    username: "emily_brown",
  },
  {
    id: "4",
    incompleteUserDetails: false,
    discordJoinedAt: "2022-04-05T09:15:00.000000+00:00",
    discordId: "246813579",
    roles: {
      archived: false,
      in_discord: true,
    },
    last_name: "Johnson",
    linkedin_id: "johnsonj",
    picture: {
      publicId: "profile/4/image",
      url: "https://example.com/profile/4/image.jpg",
    },
    yoe: 0,
    github_display_name: "JohnJ",
    updated_at: 1694609807061,
    github_id: "johnj2022",
    company: "Tech Startups",
    designation: "Junior Developer",
    twitter_id: "johnson_tweets",
    first_name: "David",
    username: "david_johnson",
  },
  {
    id: "5",
    incompleteUserDetails: false,
    discordJoinedAt: "2022-06-30T14:50:00.000000+00:00",
    discordId: "369258147",
    roles: {
      archived: false,
      in_discord: true,
    },
    last_name: "Wilson",
    linkedin_id: "wilsonw",
    picture: {
      publicId: "profile/5/image",
      url: "https://example.com/profile/5/image.jpg",
    },
    yoe: 0,
    github_display_name: "WilsonW",
    updated_at: 1694793330632,
    github_id: "wilsonw2023",
    company: "Tech Enterprises",
    designation: "Intern",
    twitter_id: "wilson_tweets",
    first_name: "Sarah",
    username: "sarah_wilson",
  },
];

export const overdueTaskResponse = {
  message: "Users returned successfully!",
  count: 5,
  users: users,
};

export const onboardingUsersResponse = {
  message: "Users returned successfully!",
  users: users,
};

export const userWithoutDiscordJoinedAt = {
  id: "DWcTUhbC5lRXfDjZRp06",
  incompleteUserDetails: false,
  discordJoinedAt: "",
  created_at: 1692748800000,
  discordId: "504855562094247953",
  github_display_name: "John Doe",
  updated_at: 1694888822719,
  roles: {
    archived: false,
    in_discord: true,
    member: false,
    super_user: false,
    archive: false,
  },
  last_name: "Doe",
  github_id: "johndoe",
  first_name: "John",
  username: "johndoe",
  state: "IDLE",
};

export const userWithoutDiscordJoinedAtResponse = {
  message: "Users returned successfully!",
  user: userWithoutDiscordJoinedAt,
};
