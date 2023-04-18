import { INTERNAL_SERVER_ERROR } from "../constants/responses";
import { DISCORD_BASE_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";

export async function createGuildRole(
  roleName: string,
  permissions: number,
  env: env
) {
  const createGuildRoleUrl = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/roles`;
  const data = {
    name: roleName,
    permissions,
  };
  try {
    const response = await fetch(createGuildRoleUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log(response.json());
      return INTERNAL_SERVER_ERROR;
    }

    const roleData = await response.json();
    return roleData;
  } catch (err) {
    console.log(err);
    return INTERNAL_SERVER_ERROR;
  }
}
