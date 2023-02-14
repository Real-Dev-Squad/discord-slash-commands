// TO send discord DM we need 2 APIs.
// 1. create a channel for dm
// 2. send the message over the created channel.

import { DISCORD_BASE_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";
import { createDmChannel } from "../typeDefinitions/discordMessage.types";

/**
 *
 * @param userId {number}: user id of the person using the slash command received from the interaction
 * @param env {env}: contains environment variables
 */

export const sendDiscordDm = async (userId: number, env: env) => {
  // "/users/@me/channels" is an endpoint provided by discord to create a dm channel
  try {
    const createDmChannel: createDmChannel = await fetch(
      `${DISCORD_BASE_URL}/users/@me/channels`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${env.DISCORD_TOKEN}`,
        },
        body: JSON.stringify({
          recipient_id: userId,
        }),
      }
    ).then((res) => {
      return res.json();
    });

    const channelId = createDmChannel.id;

    // "/channels/{channel.id}/messages" is used to send a message to the specified channel
    await fetch(`${DISCORD_BASE_URL}/channels/${channelId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
      },
      body: JSON.stringify({
        content: "Hello",
      }),
    });
  } catch (e) {
    console.log("Could not send the DM. Error: ", e);
  }
};
