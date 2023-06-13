import { commandNotFound } from "./commandNotFound";
import { helloCommand } from "./helloCommand";
import { verifyCommand } from "./verifyCommand";
import { mentionEachUser } from "./mentionEachUser";

import { getCommandName } from "../utils/getCommandName";
import JSONResponse from "../utils/JsonResponse";
import { lowerCaseMessageCommands } from "../utils/lowerCaseMessageCommand";

import { env } from "../typeDefinitions/default.types";
import { discordMessageRequest, messageRequestDataOptions } from "../typeDefinitions/discordMessage.types";

import { HELLO, MENTION_EACH, VERIFY } from "../constants/commands";

export async function baseHandler(
  message: discordMessageRequest,
  env: env
): Promise<JSONResponse> {
  const command = lowerCaseMessageCommands(message);

  switch (command) {
    case getCommandName(HELLO): {
      return helloCommand(message.member.user.id);
    }
    case getCommandName(VERIFY): {
      return await verifyCommand(
        message.member.user.id,
        message.member.user.avatar,
        message.member.user.username,
        message.member.user.discriminator,
        env
      );
    }
    case getCommandName(MENTION_EACH): {
     const data = message.data?.options as Array<messageRequestDataOptions>;

      return await mentionEachUser(
        {
          //  assertion was added because the options type is optional also eslint had hard rules set so had to cross the border :)
          displayType: data[0].name,
          options: data[0].options[0].options,
        },
        env
      );
    }
    default: {
      return commandNotFound();
    }
  }
}
