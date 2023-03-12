import { InteractionResponseType } from "discord-interactions";
import JSONResponse from "./JsonResponse";

export const discordTextResponse = (reply: string): JSONResponse => {
  return new JSONResponse({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: reply,
    },
  });
};
