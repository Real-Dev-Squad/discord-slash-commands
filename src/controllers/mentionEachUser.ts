import { discordTextResponse } from "../utils/discordResponse";
import { filterUserByRoles } from "../utils/filterUsersByRole";
import { getMembersInServer } from "../utils/getMembersInServer";

import { env } from "../typeDefinitions/default.types";
import {
  UserArray,
  MentionEachUserOptions,
} from "../typeDefinitions/filterUsersByRole";
import { checkDisplayType } from "../utils/checkDisplayType";

export async function mentionEachUser(
  transformedArgument: {
    roleToBeTaggedObj: MentionEachUserOptions;
    displayMessageObj?: MentionEachUserOptions;
  },
  env: env
) {
  const getMembersInServerResponse = await getMembersInServer(env);
  const roleId = transformedArgument.roleToBeTaggedObj.value;
  // optional chaining here only because display message obj is optional argument
  const usersWithMatchingRole = filterUserByRoles(
    getMembersInServerResponse as UserArray[],
    roleId
  );

  const responseData = checkDisplayType({
    usersWithMatchingRole,
  });
  return discordTextResponse(responseData);
}
