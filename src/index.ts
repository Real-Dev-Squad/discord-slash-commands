import { Router } from "itty-router";
import { InteractionResponseType, InteractionType } from "discord-interactions";
import * as response from "./constants/responses";
import { baseHandler } from "./controllers/baseHandler";
import { env } from "./typeDefinitions/default.types";
import { discordMessageRequest } from "./typeDefinitions/discordMessage.types";
import JSONResponse from "./utils/JsonResponse";
import { verifyBot } from "./utils/verifyBot";
import {
  addGroupRoleHandler,
  createGuildRoleHandler,
  removeGuildRoleHandler,
  getGuildRoleByRoleNameHandler,
  getGuildRolesHandler,
  getGuildRolesPostHandler,
} from "./controllers/guildRoleHandler";
import { getMembersInServerHandler } from "./controllers/getMembersInServer";
import { changeNickname } from "./controllers/changeNickname";
import { getGuildMemberDetailsHandler } from "./controllers/getGuildMemberDetailsHandler";
import { send } from "./handlers/scheduledEventHandler";
import { generateInviteLink } from "./controllers/generateDiscordInvite";
import { sendProfileBlockedMessage } from "./controllers/profileHandler";

const router = Router();

router.get("/", async () => {
  return new JSONResponse(response.STATUS_CHECK, {
    status: 200,
  });
});

router.patch("/guild/member", changeNickname);

router.put("/roles/create", createGuildRoleHandler);

router.put("/roles/add", addGroupRoleHandler);

router.post("/roles", getGuildRolesPostHandler);

router.delete("/roles", removeGuildRoleHandler);

router.get("/roles", getGuildRolesHandler);

router.get("/roles/:roleName", getGuildRoleByRoleNameHandler);

router.get("/discord-members", getMembersInServerHandler);

router.get("/member/:id", getGuildMemberDetailsHandler);
router.patch("/guild/member", changeNickname);

router.put("/roles/create", createGuildRoleHandler);
router.post("/invite", generateInviteLink);

router.put("/roles/add", addGroupRoleHandler);

router.delete("/roles", removeGuildRoleHandler);

router.post("/profile/blocked", sendProfileBlockedMessage);

router.post("/", async (request, env, ctx: ExecutionContext) => {
  const message: discordMessageRequest = await request.json();

  if (message.type === InteractionType.PING) {
    return new JSONResponse({
      type: InteractionResponseType.PONG,
    });
  }
  if (message.type === InteractionType.APPLICATION_COMMAND) {
    return baseHandler(message, env, ctx);
  }
  return new JSONResponse(response.UNKNOWN_INTERACTION, { status: 400 });
});

router.all("*", async () => {
  return new JSONResponse(response.NOT_FOUND, {
    status: 404,
  });
});

export default {
  async fetch(
    request: Request,
    env: env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const apiUrls = ["/invite", "/roles", "/profile/blocked"];
    const url = new URL(request.url);
    if (request.method === "POST" && !apiUrls.includes(url.pathname)) {
      const isVerifiedRequest = await verifyBot(request, env);
      if (!isVerifiedRequest) {
        return new JSONResponse(response.BAD_SIGNATURE, { status: 401 });
      }
    }
    return router.handle(request, env, ctx);
  },

  async scheduled(req: Request, env: env, ctx: ExecutionContext) {
    ctx.waitUntil(send(env));
  },
};
