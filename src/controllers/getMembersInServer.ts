import jwt from "@tsndr/cloudflare-worker-jwt";
import { IRequest } from "itty-router";
import * as response from "../constants/responses";
import { env } from "../typeDefinitions/default.types";
import { DISCORD_BASE_URL } from "../constants/urls";
import JSONResponse from "../utils/JsonResponse";

export const getMembersInServer = async (request: IRequest, env: env) => {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return new JSONResponse(response.BAD_SIGNATURE);
  }
  const authToken = authHeader.split(" ")[1];
  try {
    await jwt.verify(authToken, env.BOT_PUBLIC_KEY, { algorithm: "RS256" });

    const MEMBERS_URL = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/members?limit=100`;
    const response = await fetch(MEMBERS_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
      },
    });
    const users = await response.json();
    console.log(users);

    return new JSONResponse(users);
  } catch (err) {
    console.error(err);
    return new JSONResponse(response.BAD_SIGNATURE);
  }
};
