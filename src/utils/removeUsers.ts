import { env } from "../typeDefinitions/default.types";
import { DISCORD_BASE_URL } from "../constants/urls";
import {
  parseRateLimitRemaining,
  parseResetAfter,
} from "./batchDiscordRequests";

export async function removeUsers(env: env, usersWithMatchingRole: string[]) {
  const batchSize = 4;
  let waitTillNextAPICall = 0;

  try {
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
        }).then(async (response) => {
          const rateLimitRemaining = parseRateLimitRemaining(response);

          if (rateLimitRemaining === 0) {
            waitTillNextAPICall = Math.max(
              parseResetAfter(response),
              waitTillNextAPICall
            );
          }

          // Check if response status is 204 (No Content) indicating success
          if (response.status === 204) {
            return { success: true };
          } else {
            throw new Error(`Failed to remove user ${userId}.`);
          }
        });
      });

      // Wait for all delete requests in the batch to complete
      await Promise.all(deleteRequests);

      // Wait until the next API call is allowed based on rate limits
      await sleep(waitTillNextAPICall * 1000);
      waitTillNextAPICall = 0;
    }
  } catch (error) {
    console.error("Error occurred while removing users:", error);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
