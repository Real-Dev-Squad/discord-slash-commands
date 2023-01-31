import { discordMessageRequest } from "../typeDefinitions/discordMessage.types";

export function lowerCaseMessageCommands(
  message: discordMessageRequest
): string {
  return message.data.name.toLowerCase();
}
