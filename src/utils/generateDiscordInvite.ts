import { INTERNAL_SERVER_ERROR, INVITED_CREATED } from "../constants/responses";
import { DISCORD_BASE_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";
import { inviteLinkBody } from "../typeDefinitions/discordMessage.types";

export async function generateDiscordLink(body: inviteLinkBody, env: env) {
  const { channelId } = body;
  const generateInviteUrl = `${DISCORD_BASE_URL}/channels/${channelId}/invites`;

  const inviteOptions = {
    max_uses: 1, // Maximum number of times the invite can be used
    unique: true, // Whether to create a unique invite or not
  };
  try {
    const response = await fetch(generateInviteUrl, {
      method: "POST",
      body: JSON.stringify(inviteOptions),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return { message: INVITED_CREATED, data };
    } else {
      return INTERNAL_SERVER_ERROR;
    }
  } catch (err) {
    return INTERNAL_SERVER_ERROR;
  }
}
