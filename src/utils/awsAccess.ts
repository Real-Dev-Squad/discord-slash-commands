import jwt from "@tsndr/cloudflare-worker-jwt";
import { env } from "../typeDefinitions/default.types";
import config from "../../config/config";
import { discordTextResponse } from "./discordResponse";
import { DISCORD_BASE_URL, AWS_IAM_SIGNIN_URL } from "../constants/urls";
import { generateDiscordAuthToken } from "./authTokenGenerator";

export async function processAWSAccessRequest(
  discordUserId: string,
  awsGroupId: string,
  env: env,
  channelId: number
): Promise<void> {
  const authToken = await generateDiscordAuthToken(
    "Cloudflare Worker",
    Math.floor(Date.now() / 1000) + 2,
    env.BOT_PRIVATE_KEY,
    "RS256"
  );
  const discordReplyUrl = `${DISCORD_BASE_URL}/channels/${channelId}/messages`;
  const base_url = config(env).RDS_BASE_API_URL;
  const grantAWSAccessAPIUrl = `${base_url}/aws/groups/access?dev=true`;

  try {
    const requestData = {
      groupId: awsGroupId,
      userId: discordUserId,
    };

    /**
     * Grant AWS access is the API in website backend,
     * which takes the discordId and AWS groupId, it fetches the
     * user based on the discordId, checks if the user is part of AWS account
     * if not creates a new user and adds user to the AWS group.
     */

    const response = await fetch(grantAWSAccessAPIUrl, {
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
    await fetch(discordReplyUrl, {
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
    await fetch(discordReplyUrl, {
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
  // Immediately send a Discord response to acknowledge the command, as the cloudfare workers have a limit of response time equals to 3s
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
