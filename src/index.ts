import { InteractionResponseType, InteractionType } from "discord-interactions";
import { Router } from "itty-router";
import * as error from "./constants/errors";
import { Env } from "./typeDefinitions/default.types";
import { discordMessageRequest } from "./typeDefinitions/discordMessage.types";
import JSONResponse from "./utils/JsonResponse";
import { verifyBot } from "./utils/verifyBot";

const router = Router();

router.get("/", async () => {
  return new JSONResponse(
    { message: "Welcome to our discord Bot Server 👋" },
    {
      status: 200,
    }
  );
});

router.post("/", async (request) => {
  const message: discordMessageRequest = await request.json();
  if (message.type === InteractionType.PING) {
    return new JSONResponse({
      type: InteractionResponseType.PONG,
    });
  }
  return new JSONResponse(error.UNKNOWN_INTERACTION, { status: 400 });
});

router.all("*", async () => {
  return new JSONResponse(error.NOT_FOUND, {
    status: 404,
  });
});

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "POST") {
      const isVerifiedRequest = await verifyBot(request, env);
      if (!isVerifiedRequest) {
        console.error("Invalid Request");
        return new JSONResponse(error.BAD_SIGNATURE, { status: 401 });
      }
    }
    return router.handle(request, env);
  },
};
