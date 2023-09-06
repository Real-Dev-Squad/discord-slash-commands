import { IRequest } from "itty-router";
import * as response from "../constants/responses";
import { env } from "../typeDefinitions/default.types";
import JSONResponse from "../utils/JsonResponse";
import { verifyAuthToken } from "../utils/verifyAuthToken";
import { generateDiscordLink } from "../utils/generateDiscordInvite";
import { inviteLinkBody } from "../typeDefinitions/discordLink.types";

export async function generateInviteLink(request: IRequest, env: env) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return new JSONResponse(response.BAD_SIGNATURE);
  }
  try {
    await verifyAuthToken(authHeader, env);
    const body: inviteLinkBody = await request.json();
    const res = await generateDiscordLink(body, env);
    return new JSONResponse(res);
  } catch (err) {
    return new JSONResponse(response.BAD_SIGNATURE);
  }
}
