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

  const usersText = usersWithMatchingRole
    .map((user) => {
      return user;
    })
    .join("\n");

  if (usersWithMatchingRole.length === 0) {
    return discordTextResponse(
      `We couldn't find any user(s) assigned to <@&${roleId}> role.`
    );
  } else {
    ctx.waitUntil(removeUsers(env, usersWithMatchingRole));
    const responseText = `Following users are removed:\n${usersText}`;
    return discordTextResponse(responseText);
  }
}
