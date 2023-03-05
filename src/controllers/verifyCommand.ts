import config from "../../config/config";
import { env } from "../typeDefinitions/default.types";
import { discordTextResponse } from "../utils/discordResponse";
import { generateUniqueToken } from "../utils/generateUniqueToken";
import { sendDiscordDm } from "../utils/sendDiscordDm";
import { sendUserDiscordData } from "../utils/sendUserDiscordData";

export async function verifyCommand(
  userId: number,
  userAvatarHash: string,
  userName: string,
  discriminator: string,
  env: env
) {
  const token = await generateUniqueToken();

  const response = await sendUserDiscordData(
    token,
    userId,
    userAvatarHash,
    userName,
    discriminator,
    env
  );
  if (response?.status === 201) {
    const verificationSiteURL = config(env).VERIFICATION_SITE_URL;
    const message = `${verificationSiteURL}/discord?token=${token}`;
    await sendDiscordDm(userId, env, message);
    return discordTextResponse("Please check the DM");
  } else {
    return discordTextResponse("Error, please use the verify command again. ");
  }
}
