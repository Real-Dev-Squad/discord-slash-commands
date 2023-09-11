import { env } from "../typeDefinitions/default.types";
import {} from "../typeDefinitions/discordMessage.types";
import { discordTextResponse } from "../utils/discordResponse";
import { fetchAndFormatUserDetails } from "../utils/fetchAndFormatUserDetails";

export async function userCommand(userId: string, env: env) {
  try {
    const formattedUserDetails = await fetchAndFormatUserDetails(userId);
    return discordTextResponse(`## User Details  
  ${formattedUserDetails}`);
  } catch (error) {
    console.error("User not found", error);
    return discordTextResponse("Trouble in fetching user details.");
  }
}
