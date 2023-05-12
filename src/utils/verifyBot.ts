import { verifyKey } from "discord-interactions";
import { env } from "../typeDefinitions/default.types";
/**
 *
 * @param request { Request } : request the worker receives
 * @param env { env }: the ctx (context) which contains the secrets put in as wrangler secrets.
 * @returns {Boolean}: Returns if the request received is a valid discord request.
 */

export async function verifyBot(request: Request, env: env) {
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
