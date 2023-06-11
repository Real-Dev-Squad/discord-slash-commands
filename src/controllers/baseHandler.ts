import { HELLO, MENTION_EACH, VERIFY } from "../constants/commands";
import { env } from "../typeDefinitions/default.types";
import { discordMessageRequest } from "../typeDefinitions/discordMessage.types";
import { getCommandName } from "../utils/getCommandName";
import JSONResponse from "../utils/JsonResponse";
import { lowerCaseMessageCommands } from "../utils/lowerCaseMessageCommand";
import { commandNotFound } from "./commandNotFound";
import { helloCommand } from "./helloCommand";
import { verifyCommand } from "./verifyCommand";
import { mentionEachUser } from "./mentionEachUser";

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
      return await mentionEachUser(
        {
          //  assertion was added because the options type is optional also eslint had hard rules set so had to cross the border :)
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          displayType: message.data?.options![0]?.name,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          options: message.data?.options![0]?.options![0]?.options,
        },
        env
      );
    }
    default: {
      return commandNotFound();
    }
  }
}
