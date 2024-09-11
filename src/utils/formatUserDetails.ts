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

export function formatUserDetails(userDetails: UserResponseType) {
  const convertedTimestamp = convertTimeStamp(userDetails);

  const userFullName = `**Full Name :** ${userDetails.user?.first_name} ${userDetails.user?.last_name}`;
  const discordJoinedAt = `**Joined Server on :** ${convertedTimestamp}`;
  const userState = `**State :** ${userDetails.user?.state}`;
  const userName = `**User Name :** ${userDetails.user?.username}`;
  const userId = `**User Id :** ${userDetails.user?.id}`;

  return `## User Details\n${userFullName}\n${discordJoinedAt}\n${userState}\n${userName}\n${userId}`;
}
