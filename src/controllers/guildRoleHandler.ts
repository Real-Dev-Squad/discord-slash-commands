import * as response from "../constants/responses";
import { env } from "../typeDefinitions/default.types";
import JSONResponse from "../utils/JsonResponse";
import { IRequest } from "itty-router";
import {
  addGroupRole,
  createGuildRole,
  removeGuildRole,
  getGuildRoleByName,
  getGuildRoles,
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
    return new JSONResponse(res, {
      status: 200,
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
  } catch (err) {
    return new JSONResponse(response.INTERNAL_SERVER_ERROR, {
      status: 500,
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
  }
}
export async function getGuildRolesHandler(request: IRequest, env: env) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return new JSONResponse(response.BAD_SIGNATURE, { status: 401 });
  }
  try {
    await verifyAuthToken(authHeader, env);
    const roles = await getGuildRoles(env);
    return new JSONResponse({ roles });
  } catch (err: any) {
    const error =
      err?.message === response.ROLE_FETCH_FAILED
        ? response.ROLE_FETCH_FAILED
        : response.INTERNAL_SERVER_ERROR;
    return new JSONResponse(
      {
        error,
      },
      {
        status: 500,
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      }
    );
  }
}

export async function getGuildRoleByRoleNameHandler(
  request: IRequest,
  env: env
) {
  const authHeader = request.headers.get("Authorization");
  const roleName = decodeURI(request.params?.roleName ?? "");

  if (!authHeader) {
    return new JSONResponse(response.BAD_SIGNATURE, { status: 401 });
  }

  if (!roleName) {
    return new JSONResponse(response.BAD_REQUEST, { status: 404 });
  }
  try {
    await verifyAuthToken(authHeader, env);
    const role = await getGuildRoleByName(roleName, env);
    if (!role) {
      return new JSONResponse(response.NOT_FOUND, {
        status: 404,
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      });
    }
    return new JSONResponse(role);
  } catch (err: any) {
    const error =
      err?.message === response.ROLE_FETCH_FAILED
        ? response.ROLE_FETCH_FAILED
        : response.INTERNAL_SERVER_ERROR;
    return new JSONResponse(
      { error },
      {
        status: 500,
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      }
    );
  }
}
