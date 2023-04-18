import jwt from "@tsndr/cloudflare-worker-jwt";
import * as response from "../constants/responses";
import { env } from "../typeDefinitions/default.types";
import JSONResponse from "../utils/JsonResponse";
import { IRequest } from "itty-router";
import { createGuildRole } from "../utils/createGuildRole";

export async function createGuildRoleHandler(request: IRequest, env: env) {
  const req = await request.json();
  const authorization = request.headers.get("Authorization")?.split(" ")[1];
  if (await jwt.verify(authorization, env.BOT_PRIVATE_KEY)) {
    const { roleName, permissions } = req;
    const res = await createGuildRole(roleName, permissions, env);
    return new JSONResponse(res);
  } else return new JSONResponse(response.BAD_SIGNATURE);
}
