import { discordTextResponse } from "../utils/discordResponse";
import { getUserOOODetails } from "../utils/getUserOOODetails";

export async function oooCommand(userId: string) {
  console.log(userId);

  const responseuser = await getUserOOODetails(userId);

  if (responseuser) {
    if (typeof responseuser === "string") {
      return discordTextResponse(responseuser);
    } else {
      return discordTextResponse(responseuser.error);
    }
  } else {
    return discordTextResponse("No data found");
  }
}
