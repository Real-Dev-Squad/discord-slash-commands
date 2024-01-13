import { HeadersInit } from "node-fetch";
import {
  INTERNAL_SERVER_ERROR,
  ROLE_ADDED,
  ROLE_FETCH_FAILED,
  ROLE_REMOVED,
} from "../constants/responses";
import { DISCORD_BASE_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";
import {
  createNewRole,
  guildRoleResponse,
  memberGroupRole,
} from "../typeDefinitions/discordMessage.types";
import { GuildRole, Role } from "../typeDefinitions/role.types";
import createDiscordHeaders from "./createDiscordHeaders";

export async function createGuildRole(
  body: createNewRole,
  env: env,
  reson?: string
): Promise<guildRoleResponse | string> {
  const createGuildRoleUrl = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/roles`;
  const data = {
    ...body,
    name: body.rolename,
  };
  const headers: HeadersInit = createDiscordHeaders({
    reson,
    token: env.DISCORD_TOKEN,
  });
  try {
    const response = await fetch(createGuildRoleUrl, {
      method: "POST",
      headers,
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

export async function addGroupRole(
  body: memberGroupRole,
  env: env,
  reson?: string
) {
  const { userid, roleid } = body;
  const createGuildRoleUrl = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/members/${userid}/roles/${roleid}`;
  try {
    const headers: HeadersInit = createDiscordHeaders({
      reson,
      token: env.DISCORD_TOKEN,
    });
    const response = await fetch(createGuildRoleUrl, {
      method: "PUT",
      headers,
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

export async function removeGuildRole(
  details: memberGroupRole,
  env: env,
  reson?: string
) {
  const { userid, roleid } = details;
  const removeGuildRoleUrl = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/members/${userid}/roles/${roleid}`;
  try {
    const headers: HeadersInit = createDiscordHeaders({
      reson,
      token: env.DISCORD_TOKEN,
    });
    const response = await fetch(removeGuildRoleUrl, {
      method: "DELETE",
      headers,
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

export async function getGuildRoles(env: env): Promise<Array<Role>> {
  const guildRolesUrl = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/roles`;

  try {
    const headers: HeadersInit = createDiscordHeaders({
      token: env.DISCORD_TOKEN,
    });
    const response = await fetch(guildRolesUrl, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(ROLE_FETCH_FAILED);
    }

    const guildRoles: Array<GuildRole> = await response.json();

    return guildRoles.map((role) => ({
      id: role.id,
      name: role.name,
    }));
  } catch (err) {
    throw new Error(ROLE_FETCH_FAILED);
  }
}

export async function getGuildRoleByName(
  roleName: string,
  env: env
): Promise<Role | undefined> {
  const roles = await getGuildRoles(env);
  return roles?.find((role) => role.name === roleName);
}
