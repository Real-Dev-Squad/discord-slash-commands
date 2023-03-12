import { COMMAND_NOT_FOUND } from "../constants/responses";
import { discordTextResponse } from "../utils/discordResponse";
import JSONResponse from "../utils/JsonResponse";

export function commandNotFound(): JSONResponse {
  return discordTextResponse(COMMAND_NOT_FOUND);
}
