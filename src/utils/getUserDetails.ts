import { formatUserDetails } from "../utils/formatUserDetails";
import { RDS_BASE_API_URL } from "../constants/urls";

export async function getUserDetails(userId: string) {
  try {
    console.log("discord id", userId);
    const response = await fetch(
      `${RDS_BASE_API_URL}/users/?dev=true&discordId=${userId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user details for ${userId}.`);
    }

    const data = await response.json();
    const user = `${JSON.stringify(data)}`;
    console.log("user data", user);
    return formatUserDetails(user);
  } catch (error) {
    console.error("An error occurred while fetching user details:", error);
    throw error;
  }
}
