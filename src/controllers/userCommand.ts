import { env } from "../typeDefinitions/default.types";
import {} from "../typeDefinitions/discordMessage.types";
import { discordTextResponse } from "../utils/discordResponse";
import { getUserDetails } from "../utils/getUserDetails";

export async function userCommand(userId: string, env: env) {
  try {
    console.log("id", userId);
    const UserDetails = await getUserDetails(userId);
    return discordTextResponse(UserDetails);
  } catch (error) {
    console.error("User not found", error);
    return discordTextResponse("Trouble in fetching user details.");
  }
}
