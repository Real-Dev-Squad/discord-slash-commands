import * as response from "../constants/responses";
import { env } from "../typeDefinitions/default.types";
import { DISCORD_BASE_URL } from "../constants/urls";

export const getMembersInServer = async (env: env) => {
  try {
    const MEMBERS_URL = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/members?limit=1000`;
    const response = await fetch(MEMBERS_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
      },
    });
    return response.json();
  } catch (err) {
    console.error(err);
    return response.BAD_SIGNATURE;
  }
};
