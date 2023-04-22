import { INTERNAL_SERVER_ERROR } from "../constants/responses";
import { DISCORD_BASE_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";
import {
  createNewRole,
  memberGroupRole,
} from "../typeDefinitions/discordMessage.types";

export async function createGuildRole(body: createNewRole, env: env) {
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
    console.log(err);
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
      return { message: "Role added successfully" };
    } else {
      return INTERNAL_SERVER_ERROR;
    }
  } catch (err) {
    console.log(err);
    return INTERNAL_SERVER_ERROR;
  }
}
