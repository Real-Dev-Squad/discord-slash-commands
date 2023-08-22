import { env } from "../typeDefinitions/default.types";
import jwt from "@tsndr/cloudflare-worker-jwt";

/**
 *
 * @param authHeader { string } : the auth header of request
 * @param env { env }: the ctx (context) which contains the secrets put in as wrangler secrets.
 */

export async function verifyAuthToken(authHeader: string, env: env) {
  const authToken = authHeader.split(" ")[1];
  await jwt.verify(authToken, env.DISCORD_PUBLIC_KEY, {
    algorithm: "RS256",
  });
}
