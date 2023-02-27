import { VERIFICATION_SITE_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";
import { discordTextResponse } from "../utils/discordResponse";
import { generateUniqueToken } from "../utils/generateUniqueToken";
import { sendDiscordDm } from "../utils/sendDiscordDm";
import { sendUserDiscordData } from "../utils/sendUserDiscordData";

export async function verifyCommand(
  userId: number,
  userAvatarHash: string,
  userName: string,
  env: env
) {
  const token = await generateUniqueToken();
  await sendUserDiscordData(token, userId, userAvatarHash, userName, env);
  const message = `${VERIFICATION_SITE_URL}/?token=${token}`;
  await sendDiscordDm(userId, env, message);
  return discordTextResponse("Please check the DM");
}
