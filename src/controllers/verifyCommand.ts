import config from "../../config/config";
import {
  RETRY_COMMAND,
  VERIFICATION_STRING,
  VERIFICATION_SUBSTRING,
} from "../constants/responses";
import { env } from "../typeDefinitions/default.types";
import { discordEphemeralResponse } from "../utils/discordEphemeralResponse";
import { generateUniqueToken } from "../utils/generateUniqueToken";
import { sendUserDiscordData } from "../utils/sendUserDiscordData";
import { DevFlag } from "../typeDefinitions/verify.types";

export async function verifyCommand(
  userId: number,
  userAvatarHash: string,
  userName: string,
  discriminator: string,
  discordJoinedAt: string,
  env: env,
  dev?: DevFlag
) {
  const token = await generateUniqueToken();
  const response = await sendUserDiscordData(
    token,
    userId,
    userAvatarHash,
    userName,
    discriminator,
    discordJoinedAt,
    env
  );
  if (response?.status === 201 || response?.status === 200) {
    let verificationSiteURL = "";
    let message = "";
    if (dev?.value) {
      verificationSiteURL = config(env).MAIN_SITE_URL;
      message = `${VERIFICATION_STRING}\n${verificationSiteURL}/discord?dev=true&token=${token}\n${VERIFICATION_SUBSTRING}`;
    } else {
      verificationSiteURL = config(env).VERIFICATION_SITE_URL;
      message = `${VERIFICATION_STRING}\n${verificationSiteURL}/discord?token=${token}\n${VERIFICATION_SUBSTRING}`;
    }
    return discordEphemeralResponse(message);
  } else {
    return discordEphemeralResponse(RETRY_COMMAND);
  }
}
