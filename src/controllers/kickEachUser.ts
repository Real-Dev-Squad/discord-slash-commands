import {
  MentionEachUserOptions,
  UserArray,
} from "../typeDefinitions/filterUsersByRole";
import { env } from "../typeDefinitions/default.types";
import { getMembersInServer } from "../utils/getMembersInServer";
import { filterUserByRoles } from "../utils/filterUsersByRole";
import { discordTextResponse } from "../utils/discordResponse";
import { removeUsers } from "../utils/removeUsers";

export async function kickEachUser(
  transformedArgument: {
    roleToBeRemovedObj: MentionEachUserOptions;
  },
  env: env,
  ctx: ExecutionContext
) {
  const getMembersInServerResponse = await getMembersInServer(env);
  const roleId = transformedArgument.roleToBeRemovedObj.value;

  const usersWithMatchingRole = filterUserByRoles(
    getMembersInServerResponse as UserArray[],
    roleId
  );

  if (usersWithMatchingRole.length === 0) {
    return discordTextResponse(`Found no users with the matched role.`);
  } else {
    ctx.waitUntil(removeUsers(env, usersWithMatchingRole));
    return discordTextResponse(
      `Found ${usersWithMatchingRole.length} users with the matched role, removing them shortly...`
    );
  }
}
