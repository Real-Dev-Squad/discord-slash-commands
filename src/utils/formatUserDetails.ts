import { UserResponseType } from "../typeDefinitions/rdsUser";

export function convertTimeStamp(userDetails: UserResponseType, flag: boolean) {
  const timestamp = userDetails.user?.discordJoinedAt;

  if (timestamp) {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    if (flag) {
      const monthName = date.toLocaleString("default", { month: "short" });
      const formattedDate = `${day} ${monthName}, ${year}`;
      return formattedDate;
    }
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  return "N/A";
}
export function convertEpochToDate(timestamp: number | undefined) {
  if (timestamp) {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const formattedDate = `${day} ${month}, ${year}`;

    return formattedDate;
  }

  return "N/A";
}

export function formatUserDetails(
  userDetails: UserResponseType,
  flag: boolean
) {
  const convertedTimestamp = convertTimeStamp(userDetails, flag);
  const accountCreationDate = convertEpochToDate(userDetails.user?.created_at);

  const userId = " ".repeat(30) + `**Id:** ${userDetails.user?.id}`;
  const userName =
    " ".repeat(13) + `**Username:** ${userDetails.user?.username}`;
  const userFullName = `${
    flag ? " ".repeat(13) + "**Full Name:**" : "**Full Name :**"
  } ${userDetails.user?.first_name} ${userDetails.user?.last_name}`;
  const userState = `${flag ? " ".repeat(23) + "**State:**" : "**State :**"} ${
    userDetails.user?.state
  }`;
  const discordJoinedAt = `${
    flag ? " ".repeat(4) + "**Joined Discord:**" : "**Joined Server on :**"
  } ${convertedTimestamp}`;
  const accountCreated = `**Account Created:** ${accountCreationDate}`;

  if (!flag)
    return `## User Details\n${userFullName}\n${userState}\n${discordJoinedAt}`;

  return `## User Details\n${userName}\n${userState}\n\n${userFullName}\n${userId}\n\n${accountCreated}\n${discordJoinedAt}`;
}
