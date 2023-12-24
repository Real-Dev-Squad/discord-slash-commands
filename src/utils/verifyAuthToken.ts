import {
  AUTHENTICATION_ERROR,
  INVALID_TOKEN_FORMAT,
} from "../constants/responses";
import { env } from "../typeDefinitions/default.types";
import jwt from "@tsndr/cloudflare-worker-jwt";

/**
 *
 * @param authHeader { string } : the auth header of request
 * @param env { env }: the ctx (context) which contains the secrets put in as wrangler secrets.
 */

export async function verifyAuthToken(authHeader: string, env: env) {
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new Error(INVALID_TOKEN_FORMAT);
  }
  const authToken = parts[1];
  const isValid = await jwt.verify(authToken, env.RDS_SERVERLESS_PUBLIC_KEY, {
    algorithm: "RS256",
  });
  if (!isValid) {
    throw new Error(AUTHENTICATION_ERROR);
  }
}
