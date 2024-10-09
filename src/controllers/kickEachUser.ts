import {
  MentionEachUserOptions,
  UserArray,
} from "../typeDefinitions/filterUsersByRole";
import { env } from "../typeDefinitions/default.types";
import { getMembersInServer } from "../utils/getMembersInServer";
import { filterUserByRoles } from "../utils/filterUsersByRole";
import { discordTextResponse } from "../utils/discordResponse";
import { removeUsers } from "../utils/removeUsers";
import { SUPER_USER_ONE, SUPER_USER_TWO } from "../constants/variables";
import { messageRequestMember } from "../typeDefinitions/discordMessage.types";

export async function kickEachUser(
  transformedArgument: {
    member: messageRequestMember
    roleToBeRemovedObj: MentionEachUserOptions;
    channelId: number;
  },
  env: env,
  ctx: ExecutionContext
) {
  const isUserSuperUser = [SUPER_USER_ONE, SUPER_USER_TWO].includes(transformedArgument.member.user.id.toString())
  
  if (!isUserSuperUser) {
    const responseText = `You're not authorized to make this request.`;
    return discordTextResponse(responseText);
  }

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
    ctx.waitUntil(
      removeUsers(env, usersWithMatchingRole, transformedArgument.channelId)
    );
    const responseText = `Following users will be removed shortly ..... :\n${usersText}`;
    return discordTextResponse(responseText);
  }
}
