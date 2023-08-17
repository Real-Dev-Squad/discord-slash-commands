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

import { HELLO, LISTENING, MENTION_EACH, VERIFY } from "../constants/commands";
import { updateNickName } from "../utils/updateNickname";
import { discordEphemeralResponse } from "../utils/discordEphemeralResponse";
import { removeListening } from "../utils/removeListening";

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

    case getCommandName(LISTENING): {
      const data = message.data?.options;
      const setter = data ? data[0].value : false;
      const nickname = removeListening(message.member.nick);
      if (setter) {
        await updateNickName(
          `${message.member.user.id}`,
          message.member.nick + "-listening",
          env
        );
      } else {
        await updateNickName(`${message.member.user.id}`, nickname, env);
      }

      return discordEphemeralResponse("Your nickname changed successfully");
    }
    default: {
      return commandNotFound();
    }
  }
}
