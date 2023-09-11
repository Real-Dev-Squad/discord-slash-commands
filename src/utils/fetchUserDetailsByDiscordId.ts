import { RDS_BASE_API_URL } from "../constants/urls";

export const fetchUserDetailsByDiscordId = async function (userId: string) {
  const url = `${RDS_BASE_API_URL}/users/?dev=true&discordId=${userId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
