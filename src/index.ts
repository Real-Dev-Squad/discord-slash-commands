import { Router } from "itty-router";
import { InteractionResponseType, InteractionType } from "discord-interactions";
import jwt from "@tsndr/cloudflare-worker-jwt";
import * as response from "./constants/responses";
import { baseHandler } from "./controllers/baseHandler";
import { env } from "./typeDefinitions/default.types";
import { discordMessageRequest } from "./typeDefinitions/discordMessage.types";
import JSONResponse from "./utils/JsonResponse";
import { verifyBot } from "./utils/verifyBot";
import { updateNickName } from "./utils/updateNickname";

const router = Router();

router.get("/", async () => {
  return new JSONResponse(response.STATUS_CHECK, {
    status: 200,
  });
});

router.patch("/", async (request, env) => {
  const req = await request.json();
  const authorization = await request.headers
    .get("Authorization")
    .split(" ")[1];
  if (await jwt.verify(authorization, env.BOT_PRIVATE_KEY)) {
    const discord_id = req.discordId;
    const nickname = req.username;
    const res = await updateNickName(discord_id, nickname, env);
    return new JSONResponse(res);
  } else return new JSONResponse(response.BAD_SIGNATURE);
});

router.post("/", async (request, env) => {
  const message: discordMessageRequest = await request.json();
  if (message.type === InteractionType.PING) {
    return new JSONResponse({
      type: InteractionResponseType.PONG,
    });
  }
  if (message.type === InteractionType.APPLICATION_COMMAND) {
    return baseHandler(message, env);
  }
  return new JSONResponse(response.UNKNOWN_INTERACTION, { status: 400 });
});

router.all("*", async () => {
  return new JSONResponse(response.NOT_FOUND, {
    status: 404,
  });
});

export default {
  async fetch(request: Request, env: env): Promise<Response> {
    if (request.method === "POST") {
      const isVerifiedRequest = await verifyBot(request, env);
      if (!isVerifiedRequest) {
        console.error("Invalid Request");
        return new JSONResponse(response.BAD_SIGNATURE, { status: 401 });
      }
    }
    return router.handle(request, env);
  },
};
