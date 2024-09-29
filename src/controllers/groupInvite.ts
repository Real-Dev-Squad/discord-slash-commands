import config from "../../config/config";
import { env } from "../typeDefinitions/default.types";
import { discordTextResponse } from "../utils/discordResponse";
import * as DiscordGroups from "../utils/fetchDiscordGroups";
import JSONResponse from "../utils/JsonResponse";

export async function groupInvite(
  userId: string,
  roleId: string,
  env: env
): Promise<JSONResponse> {
  const response = await DiscordGroups.fetchDiscordGroups(env);
  const group = response.groups.find((group) => group.roleid === roleId);

  if (!group) {
    return discordTextResponse(`<@&${roleId}> is not a valid group.`);
  }

  const groupName = group.rolename.replace(/^group-/, "");

  return discordTextResponse(
    `<@${userId}> join the group <@&${roleId}> via the link below:\n ${
      config(env).DASHBOARD_SITE_URL
    }/groups/?dev=true&name=${groupName}`
  );
}
