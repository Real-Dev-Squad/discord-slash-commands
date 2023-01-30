import { DISCORD_RESPONSE } from "../constants/responses";

export function helloCommand(userId: number) {
  return DISCORD_RESPONSE(`Hello <@${userId}>`);
}
