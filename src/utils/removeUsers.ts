import { env } from "../typeDefinitions/default.types";
import { DISCORD_BASE_URL } from "../constants/urls";

export const removeUsers = async (
  env: env,
  usersWithMatchingRole: string[]
) => {
  const baseUrl = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/members`;
  // Method : DELETE /guilds/{guild.id}/members/{user.id}

  for (const mention of usersWithMatchingRole) {
    // Remove <@ and > symbols from the mention
    const userId = mention.replace(/<@!*/g, "").replace(/>/g, "");
    const url = `${baseUrl}/${userId}`;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bot ${env.DISCORD_TOKEN}`,
    };

    try {
      await fetch(url, { method: "DELETE", headers });
    } catch (error) {
      console.error(`Error removing user with ID ${userId}:`, error);
    }
  }
};
