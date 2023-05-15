import * as response from "../constants/responses";
import { env } from "../typeDefinitions/default.types";
import JSONResponse from "../utils/JsonResponse";
import { IRequest } from "itty-router";
import { verifyAuthToken } from "../utils/verifyAuthToken";
import { getGuildMemberDetails } from "../utils/getGuildMemberDetails";

export async function getGuildMemberDetailsHandler(
  request: IRequest,
  env: env
) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return new JSONResponse(response.BAD_SIGNATURE);
  }
  try {
    await verifyAuthToken(authHeader, env);

    const userId = request.params.id;

    const res = await getGuildMemberDetails(userId, env);
    return new JSONResponse(res);
  } catch (err) {
    return new JSONResponse(response.BAD_SIGNATURE);
  }
}
