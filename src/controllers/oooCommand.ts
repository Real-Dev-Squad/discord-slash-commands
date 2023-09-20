import { discordTextResponse } from "../utils/discordResponse";
import { formatOOOMessage } from "../utils/formatOOOMessage";
import { getUserOOODetails } from "../utils/getUserOOODetails";
import { UserStatus } from "../typeDefinitions/userStatus.type";
import { USER_NOT_FOUND } from "../constants/responses";
import { getUserDetails } from "../utils/getUserDetails";

export async function oooCommand(discordId: string) {
  try {
    const userResponse = await getUserDetails(discordId);
    if (!userResponse.user) {
      return discordTextResponse(USER_NOT_FOUND);
    }
    const userId = userResponse?.user?.id as string;
    const userStatusResponse = await getUserOOODetails(userId);
    const responseuser = formatOOOMessage(userStatusResponse as UserStatus);
    return discordTextResponse(responseuser);
  } catch (error: any) {
    return discordTextResponse(USER_NOT_FOUND);
  }
}
