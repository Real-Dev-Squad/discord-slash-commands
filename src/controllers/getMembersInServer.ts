import { IRequest } from "itty-router";
import jwt from "@tsndr/cloudflare-worker-jwt";
import * as response from "../constants/responses";
import { env } from "../typeDefinitions/default.types";
import JSONResponse from "../utils/JsonResponse";
import { User } from "../typeDefinitions/user.types";
import { getMembersInServer } from "../utils/getMembersInServer";

export const getMembersInServerHandler = async (
  request: IRequest,
  env: env
) => {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    return new JSONResponse(response.BAD_SIGNATURE);
  }
  try {
    const authToken = authHeader.split(" ")[1];
    await jwt.verify(authToken, env.RDS_SERVERLESS_PUBLIC_KEY, { algorithm: "RS256" });

    const users = (await getMembersInServer(env)) as User[];

    return new JSONResponse(users);
  } catch (err) {
    console.error(err);
    return new JSONResponse(response.BAD_SIGNATURE);
  }
};
