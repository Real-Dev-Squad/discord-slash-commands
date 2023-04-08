import { InteractionResponseType } from "discord-interactions";
import JSONResponse from "./JsonResponse";
export const discordEphemeralResponse = (reply: string): JSONResponse => {
  return new JSONResponse({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: reply,
      flags: 64, // for ephemeral messages, flags value 64 will generate an ephemeral response. "1 << 6" is converted to integer.
    },
  });
};
