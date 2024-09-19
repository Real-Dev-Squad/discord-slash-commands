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
    dev?: DevFlag;
  },
  env: env,
  ctx: ExecutionContext
) {
  const getMembersInServerResponse = await getMembersInServer(env);
  const roleId = transformedArgument.roleToBeTaggedObj.value;
  const msgToBeSent = transformedArgument?.displayMessageObj?.value;
  const dev = transformedArgument?.dev?.value || false;

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

  // Construct the message with the role mention and user list
  const roleTag = `<@&${roleId}>`;
  let responseMessage;
  if (usersWithMatchingRole.length === 0) {
    responseMessage = `No users found with the ${roleTag} role.`;
  } else {
    const userList = usersWithMatchingRole.join(", ");
    responseMessage = `The users with ${roleTag} roles are: ${userList}`;
  }

  if (!dev || usersWithMatchingRole.length === 0) {
    return discordTextResponse(responseMessage);
  } else {
    ctx.waitUntil(
      mentionEachUserInMessage({
        message: responseMessage,
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