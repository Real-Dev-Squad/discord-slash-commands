import { env } from "../typeDefinitions/default.types";
import jwt from "@tsndr/cloudflare-worker-jwt";
import {
  DISCORD_AVATAR_BASE_URL,
  STAGING_API_BASE_URL,
} from "../constants/urls";

export const sendUserDiscordData = async (
  token: string,
  discordId: number,
  userAvatarHash: string,
  userName: string,
  env: env
) => {
  const authToken = await jwt.sign(
    { name: "Cloudflare Worker", exp: Math.floor(Date.now() / 1000) + 2 },
    env.DISCORD_PRIVATE_KEY,
    { algorithm: "RS256" }
  );
  const data = {
    type: "discord",
    token: token,
    attributes: {
      discordId: discordId,
      userAvatar: `${DISCORD_AVATAR_BASE_URL}/${discordId}/${userAvatarHash}.jpg`,
      userName: userName,
      expiry: Date.now() + 1000 * 60 * 2,
    },
  };
  try {
    const response = await fetch(`${STAGING_API_BASE_URL}/external-accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    console.log("Error in sending the discord user data. Error: ", err);
  }
};
