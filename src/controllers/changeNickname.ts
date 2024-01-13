import { IRequest } from "itty-router";
import { env } from "../typeDefinitions/default.types";
import JSONResponse from "../utils/JsonResponse";
import * as response from "../constants/responses";
import { verifyAuthToken } from "../utils/verifyAuthToken";
import { updateNickName } from "../utils/updateNickname";

export async function changeNickname(request: IRequest, env: env) {
  const authHeader = await request.headers.get("Authorization");
  const reason = request.headers.get("X-Audit-Log-Reason");

  if (!authHeader) {
    return new JSONResponse(response.BAD_SIGNATURE);
  }

  try {
    await verifyAuthToken(authHeader, env);
    const { discordId, userName } = await request.json();
    const res = await updateNickName(discordId, userName, env, reason);
    return new JSONResponse(res);
  } catch {
    return new JSONResponse(response.BAD_SIGNATURE);
  }
}
