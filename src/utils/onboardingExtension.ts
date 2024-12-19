import config from "../../config/config";
import { DISCORD_BASE_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";
import { generateDiscordAuthToken } from "./authTokenGenerator";
import { sendReplyInDiscordChannel } from "./sendReplyInDiscordChannel";

export type CreateOnboardingExtensionArgs = {
  userId: string;
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

  const discordReplyUrl = `${DISCORD_BASE_URL}/channels/${channelId}/messages`;
  const base_url = config(env).RDS_BASE_API_URL;
  const createOnboardingExtensionUrl = `${base_url}/requests?dev=true`;
  const requestBody = {
    userId: args.userId,
    type: "ONBOARDING",
    numberOfDays: args.numberOfDays,
    requestedBy: args.discordId,
    reason: args.reason,
  };

  let content: string;

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
    await sendReplyInDiscordChannel(discordReplyUrl, content, env);
  } catch (err) {
    content = `<@${args.discordId}> Error occurred while creating onboarding extension request.`;
    await sendReplyInDiscordChannel(discordReplyUrl, content, env);
  }
};
