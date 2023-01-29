import { verifyKey } from "discord-interactions";
import { Env } from "../typeDefinitions/default.types";

/**
 *
 * @param request { Request } : request that the worker receives
 * @param env { Env }: the ctx (contest) which contains the secrets put in as wrangler secrets.
 * @returns {Boolean}: Returns if the request received is a valid discord request.
 */

export async function verifyBot(request: Request, env: Env) {
  if (request.method === "POST") {
    const signature = request.headers.get("x-signature-ed25519");
    const timestamp = request.headers.get("x-signature-timestamp");
    const body = await request.clone().arrayBuffer();

    if (signature === null || timestamp === null) {
      return new Response("Bad Request signature.", { status: 401 });
    }

    const isValidRequest = verifyKey(
      body,
      signature,
      timestamp,
      env.DISCORD_PUBLIC_KEY
    );
    return isValidRequest;
  } else {
    return false;
  }
}
