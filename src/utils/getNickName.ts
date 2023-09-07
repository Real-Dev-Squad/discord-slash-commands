import { DISCORD_BASE_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";

export async function getNickName(id: string, env: env) {
  try {
    const response = await fetch(
      `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/members/${id}`,
      {
        headers: {
          Authorization: `Bot ${env.DISCORD_TOKEN}`,
        },
      }
    );
    const data: any = await response.json();
    return data.nick;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
