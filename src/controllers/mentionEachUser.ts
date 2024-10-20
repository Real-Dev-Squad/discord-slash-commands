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

  if (!dev || usersWithMatchingRole.length === 0) {
    const responseData = checkDisplayType({
      usersWithMatchingRole,
      msgToBeSent,
      roleId,
    });
    return discordTextResponse(responseData);
  } else {
    let responseMessage = "";
    if (usersWithMatchingRole.length === 1) {
      responseMessage = `The user with <@&${roleId}> role is: ${payload.usersWithMatchingRole}`;
    } else {
      responseMessage = `The users with <@&${roleId}> role are: ${payload.usersWithMatchingRole} `;
    }
    return discordTextResponse(responseMessage);
  }
}
