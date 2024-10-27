import { discordTextResponse } from "../utils/discordResponse";
import { filterUserByRoles } from "../utils/filterUsersByRole";
import { getMembersInServer } from "../utils/getMembersInServer";

import { env } from "../typeDefinitions/default.types";
import {
  UserArray,
  MentionEachUserOptions,
  DevFlag,
} from "../typeDefinitions/filterUsersByRole";
import { mentionEachUserInMessage } from "../utils/guildRole";
import { checkDisplayType } from "../utils/checkDisplayType";

export async function mentionEachUser(
  transformedArgument: {
    roleToBeTaggedObj: MentionEachUserOptions;
    displayMessageObj?: MentionEachUserOptions;
    channelId: number;
    devtitle?: DevFlag;
    dev?: DevFlag;
  },
  env: env,
  ctx: ExecutionContext
) {
  const getMembersInServerResponse = await getMembersInServer(env);
  const roleId = transformedArgument.roleToBeTaggedObj.value;
  const msgToBeSent = transformedArgument?.displayMessageObj?.value;
  const dev = transformedArgument?.dev?.value || false;
  const devtitle = transformedArgument?.devtitle?.value || false;
  // optional chaining here only because display message obj is optional argument
  const usersWithMatchingRole = filterUserByRoles(
    getMembersInServerResponse as UserArray[],
    roleId
  );
  const payload = {
    channelId: transformedArgument.channelId,
    roleId: roleId,
    message: msgToBeSent,
    usersWithMatchingRole,
  };

  if (transformedArgument.devtitle?.value === true) {
    let responseMessage = "";
    if (usersWithMatchingRole.length === 0) {
      responseMessage = `Sorry, no user found with <@&${roleId}> role.`;
    } else if (usersWithMatchingRole.length === 1) {
      // Mention the single user by ID
      responseMessage = `The user with <@&${roleId}> role is ${payload.usersWithMatchingRole}.`;
    } else {
      // Mention multiple users by their IDs
      responseMessage = `The users with <@&${roleId}> role are ${payload.usersWithMatchingRole}.`;
    }
    return discordTextResponse(responseMessage);
  }

  if (!dev || usersWithMatchingRole.length === 0) {
    const responseData = checkDisplayType({
      usersWithMatchingRole,
      msgToBeSent,
      roleId,
    });
    return discordTextResponse(responseData);
  } else {
    // Regular dev flow to mention users
    ctx.waitUntil(
      mentionEachUserInMessage({
        message: payload.message,
        userIds: payload.usersWithMatchingRole,
        channelId: payload.channelId,
        env,
      })
    );
    return discordTextResponse(
      `Found ${usersWithMatchingRole.length} users with matched role, mentioning them shortly...`
    );
  }
}
