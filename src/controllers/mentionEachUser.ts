import { discordTextResponse } from "../utils/discordResponse";
import { filterUserByRoles } from "../utils/filterUsersByRole";
import { getMembersInServer } from "../utils/getMembersInServer";

import { env } from "../typeDefinitions/default.types";
import {
  UserArray,
  MentionEachUserOptions,
} from "../typeDefinitions/filterUsersByRole";
import { mentionEachUserInMessage } from "../utils/guildRole";

export async function mentionEachUser(
  transformedArgument: {
    roleToBeTaggedObj: MentionEachUserOptions;
    displayMessageObj?: MentionEachUserOptions;
    channelId: number;
  },
  env: env,
  ctx: ExecutionContext
) {
  const getMembersInServerResponse = await getMembersInServer(env);
  const roleId = transformedArgument.roleToBeTaggedObj.value;
  const msgToBeSent = transformedArgument?.displayMessageObj?.value;
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
  if (usersWithMatchingRole.length === 0) {
    return discordTextResponse("Sorry no user found under this role.");
  } else {
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
