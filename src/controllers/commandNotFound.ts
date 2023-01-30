import { COMMAND_NOT_FOUND } from "../constants/responses";
import { DISCORD_RESPONSE } from "../utils/discordResponse";
import JSONResponse from "../utils/JsonResponse";

export function commandNotFound(): JSONResponse {
  return DISCORD_RESPONSE(COMMAND_NOT_FOUND);
}
