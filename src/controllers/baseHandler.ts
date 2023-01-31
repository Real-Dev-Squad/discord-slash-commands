import { HELLO_COMMAND } from "../constants/commands";
import { discordMessageRequest } from "../typeDefinitions/discordMessage.types";
import { getCommandName } from "../utils/getCommandName";
import JSONResponse from "../utils/JsonResponse";
import { lowerCaseMessageCommands } from "../utils/lowerCaseMessageCommand";
import { commandNotFound } from "./commandNotFound";
import { helloCommand } from "./helloCommand";

export function baseHandler(message: discordMessageRequest): JSONResponse {
  const command = lowerCaseMessageCommands(message);
  switch (command) {
    case getCommandName(HELLO_COMMAND): {
      return helloCommand(message.member.user.id);
    }
    default: {
      return commandNotFound();
    }
  }
}
