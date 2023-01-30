import { discordCommand } from "../typeDefinitions/default.types";

export function getCommandName(command: discordCommand) {
  return command.name.toLowerCase();
}
