import { env } from "../typeDefinitions/default.types";
import { DISCORD_BASE_URL } from "../constants/urls";
import {
  parseRateLimitRemaining,
  parseResetAfter,
} from "./batchDiscordRequests";
import {
  discordMessageRequest,
  discordMessageError,
} from "../typeDefinitions/discordMessage.types";

export async function removeUsers(
  env: env,
  usersWithMatchingRole: string[],
  channelId: number
) {
  const batchSize = 4;
  let waitTillNextAPICall = 0;

  try {
    const failedUsers: Array<string> = [];
    for (let i = 0; i < usersWithMatchingRole.length; i += batchSize) {
      const batchwiseUsers = usersWithMatchingRole.slice(i, i + batchSize);
      const deleteRequests = batchwiseUsers.map((mention) => {
        const userId = mention.replace(/<@!*/g, "").replace(/>/g, "");
        const url = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/members/${userId}`;

        return fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bot ${env.DISCORD_TOKEN}`,
          },
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

      const responses = await Promise.all(deleteRequests);
      responses.forEach((response, i) => {
        if (response && "message" in response) {
          failedUsers.push(batchwiseUsers[i]);
          console.error(`Failed to remove a user`);
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
          content: `Failed to remove ${failedUsers}.`,
        }),
      });
    }
  } catch (error) {
    console.error("Error occurred while removing users:", error);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
