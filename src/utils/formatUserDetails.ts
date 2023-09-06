import { formatDate } from "../utils/formatDate";

export function formatUserDetails(user: string) {
  const userDetailsObj = JSON.parse(user);
  return `      
        **Full Name :** ${userDetailsObj.user.user.first_name} ${
    userDetailsObj.user.user.last_name
  } 
        **RDS Discord Joined At :** ${formatDate(
          userDetailsObj.user.user.discordJoinedAt
        )}
        **State :** ${userDetailsObj.user.user.state}
        `;
}
