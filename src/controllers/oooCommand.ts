import { discordTextResponse } from "../utils/discordResponse";
import JSONResponse from "../utils/JsonResponse";

export function oooCommand(userId: number): JSONResponse {
  return discordTextResponse(`OOO data of <@${userId}>`);
}
