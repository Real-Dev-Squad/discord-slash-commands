import config from "../../config/config";
import { UNAUTHORIZED_TO_CREATE_ONBOARDING_EXTENSION_REQUEST } from "../constants/responses";
import { DISCORD_BASE_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";
import { generateDiscordAuthToken } from "./authTokenGenerator";
import { getUserDetails } from "./getUserDetails";
import { sendReplyInDiscordChannel } from "./sendReplyInDiscordChannel";

export type CreateOnboardingExtensionArgs = {
  userId?: string;
  channelId: number;
  reason: string;
  numberOfDays: number;
  discordId: string;
};

export const createOnboardingExtension = async (
  args: CreateOnboardingExtensionArgs,
  env: env
) => {
  const { channelId } = args;

  const authToken = await generateDiscordAuthToken(
    "Cloudflare Worker",
    Math.floor(Date.now() / 1000) + 2,
    env.BOT_PRIVATE_KEY,
    "RS256"
  );

  let content: string;
  const discordReplyUrl = `${DISCORD_BASE_URL}/channels/${channelId}/messages`;

  if (args.userId && args.discordId !== args.userId) {
    const userResponse = await getUserDetails(args.discordId);
    if (!userResponse?.user?.roles?.super_user) {
      content = `<@${args.discordId}> ${UNAUTHORIZED_TO_CREATE_ONBOARDING_EXTENSION_REQUEST}`;
      return await sendReplyInDiscordChannel(discordReplyUrl, content, env);
    }
  }

  const userDiscordId = args.userId ? args.userId : args.discordId;
  const base_url = config(env).RDS_BASE_API_URL;
  const createOnboardingExtensionUrl = `${base_url}/requests`;

  const requestBody = {
    userId: userDiscordId,
    type: "ONBOARDING",
    numberOfDays: args.numberOfDays,
    reason: args.reason,
  };

  try {
    const response = await fetch(createOnboardingExtensionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(requestBody),
    });
    const jsonResponse = (await response.json()) as unknown as {
      message: string;
    };
    content = `<@${args.discordId}> ${jsonResponse.message}`;
    return await sendReplyInDiscordChannel(discordReplyUrl, content, env);
  } catch (err) {
    content = `<@${args.discordId}> Error occurred while creating onboarding extension request.`;
    return await sendReplyInDiscordChannel(discordReplyUrl, content, env);
  }
};
