import { UserResponseType } from "../typeDefinitions/rdsUser";

export function convertTimeStamp(userDetails: UserResponseType) {
  const timestamp = userDetails.user?.discordJoinedAt;

  if (timestamp) {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  return "N/A";
}

export function formatUserDetails(
  userDetails: UserResponseType,
  flag: boolean
) {
  const convertedTimestamp = convertTimeStamp(userDetails);

  const userId = `**User Id :** ${userDetails.user?.id}`;
  const userName = `**User Name :** ${userDetails.user?.username}`;
  const userFullName = `**Full Name :** ${userDetails.user?.first_name} ${userDetails.user?.last_name}`;
  const userState = `**State :** ${userDetails.user?.state}`;
  const discordJoinedAt = `**Joined Server on :** ${convertedTimestamp}`;

  if (!flag)
    return `## User Details\n${userFullName}\n${userState}\n${discordJoinedAt}`;

  return `## User Details\n${userId}\n${userName}\n${userFullName}\n${userState}\n${discordJoinedAt}`;
}
