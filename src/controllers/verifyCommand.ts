import config from "../../config/config";
import { RETRY_COMMAND } from "../constants/responses";
import { env } from "../typeDefinitions/default.types";
import { discordephemeralResponse } from "../utils/discordEphemeralResponse.ts";
import { generateUniqueToken } from "../utils/generateUniqueToken";
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
  if (response?.status === 201 || response?.status === 200) {
    const verificationSiteURL = config(env).VERIFICATION_SITE_URL;
    const message = `${verificationSiteURL}/discord?token=${token}`;
    const ephemeralResponse = await discordephemeralResponse(
      message,
      env.DISCORD_TOKEN
    );
    return ephemeralResponse;
  } else {
    return discordephemeralResponse(RETRY_COMMAND, env.DISCORD_TOKEN);
  }
}
