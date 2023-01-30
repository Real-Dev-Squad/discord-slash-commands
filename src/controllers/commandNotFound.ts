import { DISCORD_RESPONSE } from "../constants/responses";

export function commandNotFound() {
  return DISCORD_RESPONSE("Command Not found");
}
