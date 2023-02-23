import { env } from "../typeDefinitions/default.types";
import jwt from "@tsndr/cloudflare-worker-jwt";

export const storeUniqueToken = async (
  token: string,
  discordId: number,
  env: env
) => {
  const jwtToken = await jwt.sign(
    { name: "Cloudflare Worker", exp: Math.floor(Date.now() / 1000) + 15 },
    env.PRIVATE_TOKEN,
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
    const response = await fetch(
      `https://staging-api.realdevsquad.com/external-accounts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${jwtToken}`,
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  } catch (err) {
    console.log("Could not store the token in RDS Backend. Error: ", err);
  }
};
