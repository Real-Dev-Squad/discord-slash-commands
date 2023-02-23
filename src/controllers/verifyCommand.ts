import { VERIFICATION_SITE_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";
import { discordTextResponse } from "../utils/discordResponse";
import { generateUniqueToken } from "../utils/generateUniqueToken";
import { sendDiscordDm } from "../utils/sendDiscordDm";
import { storeUniqueToken } from "../utils/storeUniqueToken";

export async function verifyCommand(userId: number, env: env) {
  const token = await generateUniqueToken();
  const storeToken = await storeUniqueToken(token, userId, env);
  const message = `${VERIFICATION_SITE_URL}/?token=${token}`;
  await sendDiscordDm(userId, env, message);
  return discordTextResponse("Please check the DM");
}
