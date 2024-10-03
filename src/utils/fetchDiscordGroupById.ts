import { FAILED_TO_FETCH_DISCORD_GUILD_ROLE } from "../constants/responses";
import { DISCORD_BASE_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";
import { DiscordGuildRole } from "../typeDefinitions/group.types";
import createDiscordHeaders from "./createDiscordHeaders";

async function fetchDiscordGroupById(
  roleId: string,
  env: env
): Promise<DiscordGuildRole> {
  try {
    const url = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/roles/${roleId}`;
    const headers: HeadersInit = createDiscordHeaders({
      token: env.DISCORD_TOKEN,
    });
    const options = {
      method: "GET",
      headers,
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(FAILED_TO_FETCH_DISCORD_GUILD_ROLE);
    }

    const responseData: DiscordGuildRole = await response.json();
    return responseData;
  } catch (error) {
    console.error("An error occurred while fetching discord groups:", error);
    throw error;
  }
}

export { fetchDiscordGroupById };
