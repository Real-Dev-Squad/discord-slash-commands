import config from "../../config/config";
import { RETRY_COMMAND, VERIFICATION_STRING } from "../constants/responses";
import { env } from "../typeDefinitions/default.types";
import { discordEphemeralResponse } from "../utils/discordEphemeralResponse";
import { generateUniqueToken } from "../utils/generateUniqueToken";
import  {sendUserDiscordData} from "../utils/sendUserDiscordData";

export async function verifyCommand(
  userId: number,
  userAvatarHash: string,
  userName: string,
  discriminator: string,
  env: env
) {
  const token = await generateUniqueToken();
  const response = await sendUserDiscordData(    token,
    userId,
    userAvatarHash,
    userName,
    discriminator,
    env
  );
  if (response?.status === 201 || response?.status === 200) {
    const verificationSiteURL = config(env).VERIFICATION_SITE_URL;
    const message =
      `${verificationSiteURL}/discord?token=${token}\n${VERIFICATION_STRING}`;
    return discordEphemeralResponse(message);
  } else {
    return discordEphemeralResponse(RETRY_COMMAND);
  }
}
