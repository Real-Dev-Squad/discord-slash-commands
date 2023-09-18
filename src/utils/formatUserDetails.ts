import { UserBackend } from "../typeDefinitions/userBackend.types";

export function formatUserDetails(userData: UserBackend) {
  const timestamp = userData.user.discordJoinedAt;
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return `      
        ## User Details  
        **Full Name :** ${userData.user.first_name} ${userData.user.last_name} 
        **RDS Discord Joined At :** ${formattedDate}
        **State :** ${userData.user.state}
        `;
}
