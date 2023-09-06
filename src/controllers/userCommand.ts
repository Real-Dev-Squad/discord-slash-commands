import { RDS_BASE_API_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";
import {} from "../typeDefinitions/discordMessage.types";
import { discordTextResponse } from "../utils/discordResponse";
import { formatUserDetails } from "../utils/formatUserDetails";

async function fetchUserDetails(userId: string) {
  const url = `${RDS_BASE_API_URL}/users/?discordId=${userId}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

export async function userCommand(userId: string, env: env) {
  const userDetails: any = await fetchUserDetails(userId);
  const user: any = `${JSON.stringify(userDetails)}`;
  return discordTextResponse(`## User Details  
  ${formatUserDetails(user)}`);
}
