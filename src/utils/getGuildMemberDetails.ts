import { INTERNAL_SERVER_ERROR } from "../constants/responses";
import { DISCORD_BASE_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";
import { discordMemberDetails } from "../typeDefinitions/discordMessage.types";

export async function getGuildMemberDetails(
  discordId: string,
  env: env
): Promise<discordMemberDetails | string> {
  const getGuildMemberDetailsUrl = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/members/${discordId}`;
  try {
    const response = await fetch(getGuildMemberDetailsUrl, {
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
