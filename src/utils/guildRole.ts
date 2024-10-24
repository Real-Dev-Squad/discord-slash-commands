import { HeadersInit } from "node-fetch";
import {
  INTERNAL_SERVER_ERROR,
  ROLE_ADDED,
  ROLE_FETCH_FAILED,
  ROLE_REMOVED,
} from "../constants/responses";
import { DISCORD_BASE_URL } from "../constants/urls";
import {
  parseRateLimitRemaining,
  parseResetAfter,
} from "../utils/batchDiscordRequests";

import { env } from "../typeDefinitions/default.types";
import {
  createNewRole,
  discordMessageError,
  discordMessageRequest,
  guildRoleResponse,
  memberGroupRole,
} from "../typeDefinitions/discordMessage.types";
import { GuildRole, Role } from "../typeDefinitions/role.types";
import createDiscordHeaders from "./createDiscordHeaders";
import { sleep } from "./sleep";

export async function deleteGuildRole(
  env: env,
  roleId: string,
  reason?: string
) {
  return undefined;
}

export async function createGuildRole(
  body: createNewRole,
  env: env,
  reason?: string
): Promise<guildRoleResponse | string> {
  const createGuildRoleUrl = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/roles`;
  const data = {
    ...body,
    name: body.rolename,
  };
  const headers: HeadersInit = createDiscordHeaders({
    reason,
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
  reason?: string
) {
  const { userid, roleid } = body;
  const createGuildRoleUrl = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/members/${userid}/roles/${roleid}`;
  try {
    const headers: HeadersInit = createDiscordHeaders({
      reason,
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
  reason?: string
) {
  const { userid, roleid } = details;
  const removeGuildRoleUrl = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/members/${userid}/roles/${roleid}`;
  try {
    const headers: HeadersInit = createDiscordHeaders({
      reason,
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

export async function mentionEachUserInMessage({
  message,
  userIds,
  channelId,
  env,
}: {
  message?: string;
  userIds: string[];
  channelId: number;
  env: env;
}) {
  const batchSize = 5;
  let waitTillNextAPICall = 0;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const failedUsers: Array<string> = [];
    for (let i = 0; i < userIds.length; i += batchSize) {
      const batchwiseUserIds = userIds.slice(i, i + batchSize);
      const messageRequest = batchwiseUserIds.map((userId) => {
        return fetch(`${DISCORD_BASE_URL}/channels/${channelId}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bot ${env.DISCORD_TOKEN}`,
          },
          body: JSON.stringify({
            content: `${message ? message + " " : ""} ${userId}`,
          }),
        }).then((response) => {
          const rateLimitRemaining = parseRateLimitRemaining(response);
          if (rateLimitRemaining === 0) {
            waitTillNextAPICall = Math.max(
              parseResetAfter(response),
              waitTillNextAPICall
            );
          }
          return response.json();
        }) as Promise<discordMessageRequest | discordMessageError>;
      });
      const responses = await Promise.all(messageRequest);
      responses.forEach((response, i) => {
        if (response && "message" in response) {
          failedUsers.push(batchwiseUserIds[i]);
          console.error(`Failed to mention a user`);
        }
      });
      await sleep(waitTillNextAPICall * 1000);
      waitTillNextAPICall = 0;
    }
    if (failedUsers.length > 0) {
      await fetch(`${DISCORD_BASE_URL}/channels/${channelId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${env.DISCORD_TOKEN}`,
        },
        body: JSON.stringify({
          content: `Failed to tag ${failedUsers} individually.`,
        }),
      });
    }
  } catch (error) {
    console.log("Error occured while running mentionEachUserInMessage", error);
  }
}
