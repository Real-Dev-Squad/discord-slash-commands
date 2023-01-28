import { Router } from "itty-router";
import { Env } from "./typeDefinitions/default.types";

const router = Router();

router.get("/", async () => {
  return new Response(`{message: "Welcome to our discord Bot Server 👋"}`, {
    status: 200,
  });
});

router.all("*", async () => {
  return new Response(`{message: "🥹 oops! No fish 🐟 caught 🎣"}`, {
    status: 404,
  });
});

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return router.handle(request, env);
  },
};
