import jwt from "@tsndr/cloudflare-worker-jwt";
import { env } from "../typeDefinitions/default.types";
import config from "../../config/config";
import { discordTextResponse } from "./discordResponse";
import { DISCORD_BASE_URL, AWS_IAM_SIGNIN_URL } from "../constants/urls";

export async function processAWSAccessRequest(
  discordUserId: string,
  awsGroupId: string,
  env: env,
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

    const url = `${base_url}/aws-access`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(requestData),
    });

    let content = "";
    if (!response.ok) {
      const responseText = await response.text();
      const errorData = JSON.parse(responseText);
      content = `<@${discordUserId}> Error occurred while granting AWS access: ${errorData.error}`;
    } else {
      content = `AWS access granted successfully <@${discordUserId}>! Please head over to AWS - ${AWS_IAM_SIGNIN_URL}.`;
    }
    return await fetch(`${DISCORD_BASE_URL}/channels/${channelId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
      },
      body: JSON.stringify({
        content: content,
      }),
    });
  } catch (err) {
    const content = `<@${discordUserId}> Error occurred while granting AWS access.`;
    return await fetch(`${DISCORD_BASE_URL}/channels/${channelId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
      },
      body: JSON.stringify({
        content: content,
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
  // Immediately send a Discord response to acknowledge the command
  const initialResponse = discordTextResponse(
    `<@${discordUserId}> Processing your request to grant AWS access.`
  );

  ctx.waitUntil(
    // Asynchronously call the function to grant AWS access
    processAWSAccessRequest(discordUserId, awsGroupId, env, channelId)
  );

  // Return the immediate response within 3 seconds
  return initialResponse;
}
