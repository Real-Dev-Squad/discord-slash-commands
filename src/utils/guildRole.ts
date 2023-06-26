import {
  INTERNAL_SERVER_ERROR,
  ROLE_ADDED,
  ROLE_REMOVED,
} from "../constants/responses";
import { DISCORD_BASE_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";
import {
  createNewRole,
  guildRoleResponse,
  memberGroupRole,
} from "../typeDefinitions/discordMessage.types";
import { GuildRole } from "../typeDefinitions/role.types";

export async function createGuildRole(
  body: createNewRole,
  env: env
): Promise<guildRoleResponse | string> {
  const createGuildRoleUrl = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/roles`;
  const data = {
    ...body,
    name: body.rolename,
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
    if (response.ok) {
      return await response.json();
    } else {
      return INTERNAL_SERVER_ERROR;
    }
  } catch (err) {
    return INTERNAL_SERVER_ERROR;
  }
}

export async function addGroupRole(body: memberGroupRole, env: env) {
  const { userid, roleid } = body;
  const createGuildRoleUrl = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/members/${userid}/roles/${roleid}`;
  try {
    const response = await fetch(createGuildRoleUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
      },
    });
    if (response.ok) {
      return { message: ROLE_ADDED };
    } else {
      return INTERNAL_SERVER_ERROR;
    }
  } catch (err) {
    return INTERNAL_SERVER_ERROR;
  }
}

export async function removeGuildRole(details: memberGroupRole, env: env) {
  const { userid, roleid } = details;
  const removeGuildRoleUrl = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/members/${userid}/roles/${roleid}`;
  try {
    const response = await fetch(removeGuildRoleUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
      },
    });
    if (response.ok) {
      return {
        message: ROLE_REMOVED,
        userAffected: {
          userid,
          roleid,
        },
      };
    }
  } catch (err) {
    return INTERNAL_SERVER_ERROR;
  }
}


export async function getGuildRoles(env: env): Promise<Array<GuildRole>> {
  return [];
}

export async function getGuildRoleByName(
  roleName: string,
  env: env
): Promise<GuildRole> {
  return {
    id: "dummy-id",
    name: "dummy-name",
  };
}
