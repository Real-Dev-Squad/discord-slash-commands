import { env } from "../typeDefinitions/default.types";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { DISCORD_AVATAR_BASE_URL } from "../constants/urls";
import config from "../../config/config";
import { generateDiscordAuthToken } from "./authTokenGenerator";

export const sendUserDiscordData = async (
  token: string,
  discordId: number,
  userAvatarHash: string,
  userName: string,
  discriminator: string,
  discordJoinedAt: string,
  env: env
) => {
  const authToken = await generateDiscordAuthToken(
    "Cloudflare Worker",
    Math.floor(Date.now() / 1000) + 2,
    env.BOT_PRIVATE_KEY,
    "RS256"
  );
  const data = {
    type: "discord",
    token: token,
    attributes: {
      discordId: discordId,
      userAvatar: `${DISCORD_AVATAR_BASE_URL}/${discordId}/${userAvatarHash}.jpg`,
      userName: userName,
      discriminator: discriminator,
      discordJoinedAt: discordJoinedAt,
      expiry: Date.now() + 1000 * 60 * 2,
    },
  };
  const base_url = config(env).RDS_BASE_API_URL;
  try {
    const response = await fetch(`${base_url}/external-accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (err) {
    console.error("Error in sending the discord user data. Error: ", err);
  }
};
