import { InteractionResponseType, InteractionType } from "discord-interactions";
import { Router } from "itty-router";
import { Env } from "./typeDefinitions/default.types";
import { discordMessageRequest } from "./typeDefinitions/discordMessage.types";
import JsonResponse from "./utils/JsonResponse";
import { verifyBot } from "./utils/verifyBot";

const router = Router();

router.get("/", async () => {
  return new Response(`{message: "Welcome to our discord Bot Server 👋"}`, {
    status: 200,
  });
});

router.post("/", async (request) => {
  const message: discordMessageRequest = await request.json();
  if (message.type === InteractionType.PING) {
    return new JsonResponse({
      type: InteractionResponseType.PONG,
    });
  }
  return new JsonResponse({ error: "Unknown Interaction" }, { status: 400 });
});

router.all("*", async () => {
  return new Response(`{message: "🥹 oops! No fish 🐟 caught 🎣"}`, {
    status: 404,
  });
});

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const isVerifiedRequest = await verifyBot(request, env);
    if (!isVerifiedRequest) {
      console.error("Invalid Request");
      return new Response("Bad Request signature.", { status: 401 });
    }
    return router.handle(request, env);
  },
};
