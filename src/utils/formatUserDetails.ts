import { formatDate } from "../utils/formatDate";

export function formatUserDetails(user: string) {
  const userDetailsObj = JSON.parse(user);
  const isoTimestamp = new Date(userDetailsObj.user.discordJoinedAt);
  const numericTimestamp = isoTimestamp.getTime() / 1000;

  return `      
        **Full Name :** ${userDetailsObj.user.first_name} ${
    userDetailsObj.user.last_name
  } 
        **RDS Discord Joined At :** ${formatDate(numericTimestamp)}
        **State :** ${userDetailsObj.user.state}
        `;
}
