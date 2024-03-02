import {
  AUTHENTICATION_ERROR,
  INVALID_TOKEN_FORMAT,
} from "../constants/responses";
import { env } from "../typeDefinitions/default.types";
import jwt from "@tsndr/cloudflare-worker-jwt";

async function verifyAuthToken(authHeader: string, public_key: string) {
  if (!authHeader) {
    throw new Error(INVALID_TOKEN_FORMAT);
  }
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new Error(INVALID_TOKEN_FORMAT);
  }
  const authToken = parts[1];
  const isValid = await jwt.verify(authToken, public_key, {
    algorithm: "RS256",
  });
  if (!isValid) {
    throw new Error(AUTHENTICATION_ERROR);
  }
}

/**
 *
 * @param authHeader { string } : the auth header of request
 * @param env { env }: the ctx (context) which contains the secrets put in as wrangler secrets.
 */

export async function verifyNodejsBackendAuthToken(
  authHeader: string,
  env: env
) {
  try {
    await verifyAuthToken(authHeader, env.RDS_SERVERLESS_PUBLIC_KEY);
  } catch (err: any) {
    throw new Error(err.message);
  }
}

/**
 *
 * @param authHeader { string } : the auth header of request
 * @param env { env }: the ctx (context) which contains the secrets put in as wrangler secrets.
 */

export async function verifyIdentityServiceAuthToken(
  authHeader: string,
  env: env
) {
  try {
    await verifyAuthToken(authHeader, env.IDENTITY_SERVICE_PUBLIC_KEY);
  } catch (err: any) {
    throw new Error(err.message);
  }
}

/**
 *
 * @param authHeader { string } : the auth header of request
 * @param env { env }: the ctx (context) which contains the secrets put in as wrangler secrets.
 */
export async function verifyCronJobsToken(authHeader: string, env: env) {
  try {
    await verifyAuthToken(authHeader, env.CRON_JOBS_PUBLIC_KEY);
  } catch (err: any) {
    throw new Error(err.message);
  }
}
