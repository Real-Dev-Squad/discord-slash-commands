import { DISCORD_RESPONSE } from "../utils/discordResponse";
import JSONResponse from "../utils/JsonResponse";

export function helloCommand(userId: number): JSONResponse {
  return DISCORD_RESPONSE(`Hello <@${userId}>`);
}
