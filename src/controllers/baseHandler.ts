import { commandNotFound } from "./commandNotFound";
import { helloCommand } from "./helloCommand";
import { verifyCommand } from "./verifyCommand";
import { mentionEachUser } from "./mentionEachUser";

import { getCommandName } from "../utils/getCommandName";
import JSONResponse from "../utils/JsonResponse";
import { lowerCaseMessageCommands } from "../utils/lowerCaseMessageCommand";

import { env } from "../typeDefinitions/default.types";
import {
  discordMessageRequest,
  messageRequestDataOptions,
} from "../typeDefinitions/discordMessage.types";

import { HELLO, MENTION_EACH, OOO, VERIFY } from "../constants/commands";
import { oooCommand } from "./oooCommand";

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
      // data[0] is role obj
      // data[1] is message obj
      const transformedArgument = {
        roleToBeTaggedObj: data[0],
        displayMessageObj: data[1] ?? {},
      };

      return await mentionEachUser(transformedArgument, env);
    }
    case getCommandName(OOO): {
      return oooCommand(message.member.user.id);
    }
    default: {
      return commandNotFound();
    }
  }
}
