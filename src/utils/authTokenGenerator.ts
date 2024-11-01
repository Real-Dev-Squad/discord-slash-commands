import jwt from "@tsndr/cloudflare-worker-jwt";

export async function generateDiscordAuthToken(
  name: string,
  expiry: number,
  privateKey: string,
  algorithm: string
) {
  return await jwt.sign({ name: name, exp: expiry }, privateKey, {
    algorithm: algorithm,
  });
}
