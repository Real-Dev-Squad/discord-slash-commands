import { env } from "../typeDefinitions/default.types";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { RDS_STAGING_API_URL } from "../constants/urls";

export const sendUserDiscordData = async (
  token: string,
  discordId: number,
  env: env
) => {
  const authToken = await jwt.sign(
    { name: "Cloudflare Worker", exp: Math.floor(Date.now() / 1000) + 15 },
    env.DISCORD_PRIVATE_KEY,
    { algorithm: "RS256" }
  );
  const data = {
    type: "discord",
    token: token,
    attributes: {
      discordId: discordId,
      expiry: Date.now() + 1000 * 60 * 2,
    },
  };

  try {
    const response = await fetch(`${RDS_STAGING_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    console.log("Could not store the token in RDS Backend. Error: ", err);
  }
};
