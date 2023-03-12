import { discordTextResponse } from "../utils/discordResponse";
import JSONResponse from "../utils/JsonResponse";

export function helloCommand(userId: number): JSONResponse {
  return discordTextResponse(`Hello <@${userId}>`);
}
