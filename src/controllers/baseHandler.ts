import { HELLO_COMMAND } from "../constants/commands";
import { discordMessageRequest } from "../typeDefinitions/discordMessage.types";
import { getCommandName } from "../utils/getCommandName";
import { commandNotFound } from "./commandNotFound";
import { helloCommand } from "./helloCommand";

export function baseHandler(message: discordMessageRequest) {
  const command = message.data.name.toLowerCase();
  switch (command) {
    case getCommandName(HELLO_COMMAND): {
      return helloCommand(message.member.user.id);
    }
    default: {
      return commandNotFound();
    }
  }
}
