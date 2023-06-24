import * as response from "../constants/responses";
import { env } from "../typeDefinitions/default.types";
import JSONResponse from "../utils/JsonResponse";
import { IRequest } from "itty-router";
import {
  addGroupRole,
  createGuildRole,
  removeGuildRole,
} from "../utils/guildRole";
import {
  createNewRole,
  memberGroupRole,
} from "../typeDefinitions/discordMessage.types";
import { verifyAuthToken } from "../utils/verifyAuthToken";

export async function createGuildRoleHandler(request: IRequest, env: env) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return new JSONResponse(response.BAD_SIGNATURE);
  }
  try {
    await verifyAuthToken(authHeader, env);
    const body: createNewRole = await request.json();

    const res = await createGuildRole(body, env);
    return new JSONResponse(res);
  } catch (err) {
    return new JSONResponse(response.BAD_SIGNATURE);
  }
}
export async function addGroupRoleHandler(request: IRequest, env: env) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return new JSONResponse(response.BAD_SIGNATURE);
  }
  try {
    await verifyAuthToken(authHeader, env);
    const body: memberGroupRole = await request.json();
    const res = await addGroupRole(body, env);
    return new JSONResponse(res);
  } catch (err) {
    return new JSONResponse(response.BAD_SIGNATURE);
  }
}

export async function removeGuildRoleHandler(request: IRequest, env: env) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return new JSONResponse(response.BAD_SIGNATURE, { status: 401 });
  }
  try {
    await verifyAuthToken(authHeader, env);
    const body: memberGroupRole = await request.json();
    const res = await removeGuildRole(body, env);
    return new JSONResponse(res, { status: 200 });
  } catch (err) {
    return new JSONResponse(response.INTERNAL_SERVER_ERROR, { status: 500 });
  }
}
