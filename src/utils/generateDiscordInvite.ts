import { INVITE_OPTIONS } from "../constants/inviteOptions";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  INVITED_CREATED,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
} from "../constants/responses";
import { DISCORD_BASE_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";
import { inviteLinkBody } from "../typeDefinitions/discordLink.types";
import createDiscordHeaders from "./createDiscordHeaders";

export async function generateDiscordLink(
  body: inviteLinkBody,
  env: env,
  reson?: string
) {
  const { channelId } = body;
  const generateInviteUrl = `${DISCORD_BASE_URL}/channels/${channelId}/invites`;

  const inviteOptions = {
    max_uses: INVITE_OPTIONS.MAX_USE, // Maximum number of times the invite can be used
    unique: INVITE_OPTIONS.UNIQUE, // Whether to create a unique invite or not
  };
  try {
    const headers: HeadersInit = createDiscordHeaders({
      reson,
      token: env.DISCORD_TOKEN,
    });
    const response = await fetch(generateInviteUrl, {
      method: "POST",
      body: JSON.stringify(inviteOptions),
      headers,
    });

    if (response.ok) {
      const data = await response.json();
      return { message: INVITED_CREATED, data };
    } else {
      if (response.status === 400) {
        return BAD_REQUEST;
      }

      if (response.status === 401) {
        return UNAUTHORIZED;
      }

      if (response.status === 404) {
        return NOT_FOUND;
      }

      if (response.status === 429) {
        return TOO_MANY_REQUESTS;
      }

      return INTERNAL_SERVER_ERROR;
    }
  } catch (err) {
    return INTERNAL_SERVER_ERROR;
  }
}
