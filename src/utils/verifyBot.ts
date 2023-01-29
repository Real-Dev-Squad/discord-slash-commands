import { verifyKey } from "discord-interactions";
import { Env } from "../typeDefinitions/default.types";

/**
 *
 * @param request { Request } : request the worker receives
 * @param env { Env }: the ctx (context) which contains the secrets put in as wrangler secrets.
 * @returns {Boolean}: Returns if the request received is a valid discord request.
 */

export async function verifyBot(request: Request, env: Env) {
  const signature = request.headers.get("x-signature-ed25519");
  const timestamp = request.headers.get("x-signature-timestamp");
  const body = await request.clone().arrayBuffer();

  if (signature === null || timestamp === null) {
    return false;
  }

  const isValidRequest = verifyKey(
    body,
    signature,
    timestamp,
    env.DISCORD_PUBLIC_KEY
  );

  return isValidRequest;
}
