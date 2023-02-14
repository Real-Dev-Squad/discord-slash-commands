import { env } from "../typeDefinitions/default.types";
import { discordTextResponse } from "../utils/discordResponse";
import { sendDiscordDm } from "../utils/sendDiscordDm";

export async function verifyCommand(userId: number, env: env) {
  await sendDiscordDm(userId, env);
  return discordTextResponse("Please check the DM");
}
