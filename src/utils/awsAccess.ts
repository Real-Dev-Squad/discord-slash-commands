import jwt from "@tsndr/cloudflare-worker-jwt";
import { v4 as uuidv4 } from "uuid";
import { env } from "../typeDefinitions/default.types";
import config from "../../config/config";
import { discordTextResponse } from "./discordResponse";
import { DISCORD_BASE_URL, AWS_IAM_SIGNIN_URL } from "../constants/urls";

async function processAWSAccessRequest(
  discordUserId: string,
  awsGroupId: string,
  env: env,
  TraceId: uuidv4,
  channelId: number
) {
  const authToken = await jwt.sign(
    { name: "Cloudflare Worker", exp: Math.floor(Date.now() / 1000) + 2 },
    env.BOT_PRIVATE_KEY,
    { algorithm: "RS256" }
  );

  try {
    const base_url = config(env).RDS_BASE_API_URL;
    const requestData = {
      groupId: awsGroupId,
      userId: discordUserId,
    };

    const url = `${base_url}/aws-access/`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      return fetch(`${DISCORD_BASE_URL}/channels/${channelId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${env.DISCORD_TOKEN}`,
        },
        body: JSON.stringify({
          content: `<@${discordUserId}> Error occurred while granting AWS access: ${response.status} ${response.statusText}`,
        }),
      });
    } else {
      return fetch(`${DISCORD_BASE_URL}/channels/${channelId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${env.DISCORD_TOKEN}`,
        },
        body: JSON.stringify({
          content: `AWS access granted successfully <@${discordUserId}>! Please head over to AWS - ${AWS_IAM_SIGNIN_URL}.`,
        }),
      });
    }
  } catch (err) {
    console.log(
      `[TraceId: ${TraceId}] Failed to grant AWS Access, error - `,
      err
    );
    return fetch(`${DISCORD_BASE_URL}/channels/${channelId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
      },
      body: JSON.stringify({
        content: `[TraceId: ${TraceId}] <@${discordUserId}> Error occurred while granting AWS access.`,
      }),
    });
  }
}

export async function grantAWSAccess(
  discordUserId: string,
  awsGroupId: string,
  env: env,
  ctx: ExecutionContext,
  channelId: number
) {
  const TraceId = uuidv4();
  // Immediately send a Discord response to acknowledge the command
  const initialResponse = discordTextResponse(
    `[TraceId: ${TraceId}] <@${discordUserId}> Processing your request to grant AWS access.`
  );

  ctx.waitUntil(
    // Asynchronously call the function to grant AWS access
    processAWSAccessRequest(discordUserId, awsGroupId, env, TraceId, channelId)
  );

  // Return the immediate response within 3 seconds
  return initialResponse;
}
