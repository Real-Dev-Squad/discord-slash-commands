import { verifyKey } from "discord-interactions";
import { Env } from "../typeDefinitions/default.types";

export async function verifyBot(request: Request, env: Env) {
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
}
