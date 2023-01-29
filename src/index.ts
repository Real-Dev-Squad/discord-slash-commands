import { InteractionResponseType, InteractionType } from "discord-interactions";
import { Router } from "itty-router";
import * as response from "./constants/responses";
import { Env } from "./typeDefinitions/default.types";
import { discordMessageRequest } from "./typeDefinitions/discordMessage.types";
import JSONResponse from "./utils/JsonResponse";
import { verifyBot } from "./utils/verifyBot";

const router = Router();

router.get("/", async () => {
  return new JSONResponse(response.STATUS_CHECK, {
    status: 200,
  });
});

router.post("/", async (request) => {
  const message: discordMessageRequest = await request.json();
  if (message.type === InteractionType.PING) {
    return new JSONResponse({
      type: InteractionResponseType.PONG,
    });
  }
  return new JSONResponse(response.UNKNOWN_INTERACTION, { status: 400 });
});

router.all("*", async () => {
  return new JSONResponse(response.NOT_FOUND, {
    status: 404,
  });
});

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
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
