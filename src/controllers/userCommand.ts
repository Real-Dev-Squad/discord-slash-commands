import { env } from "../typeDefinitions/default.types";
import { discordTextResponse } from "../utils/discordResponse";
import { getUserDetails } from "../utils/getUserDetails";
import { formatUserDetails } from "../utils/formatUserDetails";
import { DevFlag } from "../typeDefinitions/filterUsersByRole";
import { USER_NOT_FOUND } from "../constants/responses";

export async function userCommand(discordId: string, env: env, dev?: DevFlag) {
  try {
    const flag = dev?.value || false;
    const userDetails = await getUserDetails(discordId);
    if (!userDetails.user?.discordId) {
      return discordTextResponse(USER_NOT_FOUND);
    }
    const formattedUserDetails = formatUserDetails(userDetails, flag);
    return discordTextResponse(formattedUserDetails);
  } catch (error) {
    return discordTextResponse("Trouble in fetching user details.");
  }
}
