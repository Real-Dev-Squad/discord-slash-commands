import { INTERNAL_SERVER_ERROR } from "../constants/responses";
import { DISCORD_BASE_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";
import { guildRoleResponse } from "../typeDefinitions/discordMessage.types";

export async function getGuildMemberDetails(
  userId: string,
  env: env
): Promise<guildRoleResponse | string> {
  const createGuildRoleUrl = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/members/${userId}`;
  try {
    const response = await fetch(createGuildRoleUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      return INTERNAL_SERVER_ERROR;
    }
  } catch (err) {
    return INTERNAL_SERVER_ERROR;
  }
}
