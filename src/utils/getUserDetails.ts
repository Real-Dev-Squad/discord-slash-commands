import { formatUserDetails } from "../utils/formatUserDetails";
import { RDS_BASE_API_URL } from "../constants/urls";

export async function getUserDetails(discordId: string) {
  try {
    const response = await fetch(
      `${RDS_BASE_API_URL}/users/?dev=true&discordId=${discordId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user details for ${discordId}.`);
    }

    const data = await response.json();
    const user = `${JSON.stringify(data)}`;
    return formatUserDetails(user);
  } catch (error) {
    console.error("An error occurred while fetching user details:", error);
    throw error;
  }
}
