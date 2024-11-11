import { IRequest } from "itty-router";
import JSONResponse from "../utils/JsonResponse";
import { env } from "../typeDefinitions/default.types";
import * as response from "../constants/responses";
import { verifyNodejsBackendAuthToken } from "../utils/verifyAuthToken";
import { deleteGuildRole } from "../utils/deleteGuildRole";

export async function deleteGuildRoleHandler(request: IRequest, env: env) {
  const authHeader = request.headers.get("Authorization");
  const reason = request.headers.get("X-Audit-Log-Reason");
  const roleId = decodeURI(request.params?.roleId ?? "");
  const { dev } = request.query;
  const devFlag = dev === "true";

  if (!devFlag) {
    return new JSONResponse(response.NOT_FOUND, { status: 404 });
  }

  if (!authHeader) {
    return new JSONResponse(response.BAD_SIGNATURE, { status: 401 });
  }
  if (!roleId) {
    return new JSONResponse(response.BAD_REQUEST, { status: 400 });
  }

  try {
    await verifyNodejsBackendAuthToken(authHeader, env);
    const result = await deleteGuildRole(env, roleId, reason);

    if (result === response.ROLE_REMOVED) {
      return new Response(null, { status: 204 });
    } else {
      return new JSONResponse(response.INTERNAL_SERVER_ERROR, {
        status: 500,
      });
    }
  } catch (err) {
    console.error("An error occurred while deleting discord role:", err);
    return new JSONResponse(response.INTERNAL_SERVER_ERROR, {
      status: 500,
    });
  }
}
