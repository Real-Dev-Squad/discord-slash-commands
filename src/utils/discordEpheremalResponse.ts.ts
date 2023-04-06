import { InteractionResponseType } from "discord-interactions";
import JSONResponse from "./JsonResponse";
import { env } from "../typeDefinitions/default.types";

export const discordEpheremalResponse = async (
  reply: string,
  discordToken: string
): Promise<JSONResponse> => {
  return new JSONResponse({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: reply,
      flags: 64,
    },
    Headers: {
      Authorization: `Bot ${discordToken}`,
    },
  });
};
