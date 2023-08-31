import { env } from "../typeDefinitions/default.types";
import { discordTextResponse } from "../utils/discordResponse";
import { getUserOOODetails } from "../utils/getUserOOODetails";
// import { RDS_BASE_API_URL } from "../constants/urls";

// function fetchUser() {
//   const url = `${RDS_BASE_API_URL}/tasks/`;
//   const response = fetch(url);
//   return response;
// }

export async function oooCommand(userId: string) {
  console.log(userId);
  const responseuser = await getUserOOODetails(userId);
  return discordTextResponse(responseuser);
}
