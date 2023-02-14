import { VERIFICATION_SITE_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";
import { discordTextResponse } from "../utils/discordResponse";
import { generateUniqueToken } from "../utils/generateUniqueToken";
import { sendDiscordDm } from "../utils/sendDiscordDm";

export async function verifyCommand(userId: number, env: env) {
  const token = await generateUniqueToken();
  const url = `${VERIFICATION_SITE_URL}/?token=${token}`;
  await sendDiscordDm(userId, env, url);
  return discordTextResponse("Please check the DM");
}
