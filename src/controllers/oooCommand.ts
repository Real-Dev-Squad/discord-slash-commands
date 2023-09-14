import { discordTextResponse } from "../utils/discordResponse";
import { formatOOOMessage } from "../utils/formatOOOMessage";
import { getUserOOODetails } from "../utils/getUserOOODetails";
import { UserStatus } from "../typeDefinitions/userStatus.type";

export async function oooCommand(userId: string) {
  console.log(userId);
  try {
    const userResponse = await getUserOOODetails(userId);
    const responseuser = formatOOOMessage(userResponse as UserStatus);
    return discordTextResponse(responseuser);
  } catch (error: any) {
    return discordTextResponse(error);
  }
}
