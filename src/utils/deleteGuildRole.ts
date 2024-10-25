import { INTERNAL_SERVER_ERROR, ROLE_REMOVED } from "../constants/responses";
import { DISCORD_BASE_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";
import createDiscordHeaders from "./createDiscordHeaders";

export async function deleteGuildRole(
  env: env,
  roleId: string,
  reason?: string
) {
  const deleteGuildRoleUrl = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/roles/${roleId}`;
  const headers: HeadersInit = createDiscordHeaders({
    token: env.DISCORD_TOKEN,
    reason: reason,
  });
  try {
    const response = await fetch(deleteGuildRoleUrl, {
      method: "DELETE",
      headers,
    });
    if (response.ok) {
      return ROLE_REMOVED;
    } else {
      return INTERNAL_SERVER_ERROR;
    }
  } catch (err) {
    return INTERNAL_SERVER_ERROR;
  }
}
