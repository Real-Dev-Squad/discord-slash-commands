import { formatUserDetails } from "../utils/formatUserDetails";
import { RDS_BASE_API_URL } from "../constants/urls";

export async function getUserDetails(userId: string) {
  console.log("discord id", userId);
  const response = await fetch(
    `${RDS_BASE_API_URL}/users/?dev=true&discordId=${userId}`
  );
  console.log("response", response);
  const data = await response.json();
  const user = `${JSON.stringify(data)}`;
  console.log("user data", user);
  return formatUserDetails(user);
}
