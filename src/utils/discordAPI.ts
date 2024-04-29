// src/utils/DiscordAPI.ts

import fetch from "node-fetch";
import { DISCORD_BASE_URL } from "../constants/urls";

export async function createMutedRole(
  guildId: string,
  token: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `${DISCORD_BASE_URL}/guilds/${guildId}/roles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${token}`,
        },
        body: JSON.stringify({
          name: "Muted",
          permissions: "0",
          color: 0,
          hoist: false,
          mentionable: false,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.id;
    } else {
      console.error(
        `Error creating muted role: ${response.status} - ${response.statusText}`
      );
      return null;
    }
  } catch (error) {
    console.error("Error occurred while creating muted role:", error);
    return null;
  }
}

export async function assignRoleToUser(
  guildId: string,
  userId: string,
  roleId: string,
  token: string
): Promise<void> {
  try {
    await fetch(
      `${DISCORD_BASE_URL}/guilds/${guildId}/members/${userId}/roles/${roleId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error occurred while assigning role to user:", error);
  }
}

export async function removeRoleFromUser(
  guildId: string,
  userId: string,
  roleId: string,
  token: string
): Promise<void> {
  try {
    await fetch(
      `${DISCORD_BASE_URL}/guilds/${guildId}/members/${userId}/roles/${roleId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error occurred while removing role from user:", error);
  }
}

export async function getMutedRoleId(
  guildId: string,
  token: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `${DISCORD_BASE_URL}/guilds/${guildId}/roles`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${token}`,
        },
      }
    );

    if (response.ok) {
      const roles = await response.json();
      const mutedRole = roles.find(
        (role: any) => role.name.toLowerCase() === "muted"
      );
      return mutedRole ? mutedRole.id : null;
    } else {
      console.error(
        `Error fetching roles: ${response.status} - ${response.statusText}`
      );
      return null;
    }
  } catch (error) {
    console.error("Error occurred while fetching roles:", error);
    return null;
  }
}
