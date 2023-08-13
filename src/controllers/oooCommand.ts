import { env } from "../typeDefinitions/default.types";
import { discordTextResponse } from "../utils/discordResponse";
import { getUserOOODetails } from "../utils/getUserOOODetails";

export async function oooCommand(userId: number, env: env) {
  const response = await getUserOOODetails(userId, env);
  return discordTextResponse(`${response}`);
}
