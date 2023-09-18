import { env } from "../typeDefinitions/default.types";
import { discordTextResponse } from "../utils/discordResponse";
import { formatUserDetails } from "../utils/formatUserDetails";
// import { getUserDetails } from "../utils/getUserDetails";

export async function userCommand(discordId: string, env: env) {
  try {
    // const userDetails = await getUserDetails(discordId);
    // const formattedUserDetails = formatUserDetails(userDetails);
    // return discordTextResponse(formattedUserDetails);
  } catch (error) {
    return discordTextResponse("Trouble in fetching user details.");
  }
}
