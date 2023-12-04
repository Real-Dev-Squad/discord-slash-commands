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
import { batchDiscordRequests } from "../utils/batchDiscordRequests";
import { DISCORD_BASE_URL } from "../constants/urls";
import { GROUP_ROLE_ADD } from "../constants/requestsActions";

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

export async function getGuildRolesPostHandler(request: IRequest, env: env) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return new JSONResponse(response.BAD_SIGNATURE);
  }

  try {
    await verifyAuthToken(authHeader, env);
    const { action } = request.query;

    switch (action) {
      case GROUP_ROLE_ADD.ADD_ROLE: {
        const memberGroupRoleList = await request.json();
        const res = await bulkAddGroupRoleHandler(memberGroupRoleList, env);
        return res;
      }
      default: {
        return new JSONResponse(response.BAD_SIGNATURE);
      }
    }
  } catch (err) {
    console.error(err);
    return new JSONResponse(response.INTERNAL_SERVER_ERROR);
  }
}

export async function bulkAddGroupRoleHandler(
  memberGroupRoleList: memberGroupRole[],
  env: env
): Promise<JSONResponse> {
  try {
    if (
      !memberGroupRoleList ||
      memberGroupRoleList.length > 25 ||
      memberGroupRoleList.length === 0
    ) {
      return new JSONResponse(response.BAD_SIGNATURE, {
        status: 400,
        statusText: "Max requests length is 25",
      });
    }
    const addGroupRoleRequests = [];
    for (const memberGroupRole of memberGroupRoleList) {
      const addRoleRequest = async () => {
        const { userid, roleid } = memberGroupRole;
        const createGuildRoleUrl = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/members/${userid}/roles/${roleid}`;
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bot ${env.DISCORD_TOKEN}`,
          },
        };
        return await fetch(createGuildRoleUrl, options);
      };
      addGroupRoleRequests.push(addRoleRequest);
    }
    const responseList = await batchDiscordRequests(addGroupRoleRequests);

    const responseBody = memberGroupRoleList.map((memberGroupRole, index) => {
      return {
        userid: memberGroupRole.userid,
        roleid: memberGroupRole.roleid,
        success: responseList[index].ok,
      };
    });
    return new JSONResponse(responseBody);
  } catch (e) {
    console.error(e);
    throw e;
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
