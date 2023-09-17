import { RDS_BASE_API_URL } from "../constants/urls";
import { UserResponseType } from "../typeDefinitions/rdsUser";

async function getUserDetails(id: string): Promise<UserResponseType> {
  try {
    const response = await fetch(
      `${RDS_BASE_API_URL}/users?discordId=${id}&dev=true`
    );

    const userResponse : UserResponseType = (await response.json());
    return userResponse;
  } catch (error) {
    console.error("An error occurred:", error);
    return Promise.reject(error);
  }
}

export { getUserDetails };
