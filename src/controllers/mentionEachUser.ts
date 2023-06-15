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
  message: { displayType: string; options: Array<MentionEachUserOptions> },
  env: env
) {
  const getMembersInServerResponse = await getMembersInServer(env);

  // displaytype is list or series  & options is first level of options array on desctructure
  const { displayType, options } = message;
  const [roleToBeTaggedObj, displayMessageObj] = options;

  const roleId = roleToBeTaggedObj.value;
  const msgToBeSent = displayMessageObj.value;

  const usersWithMatchingRole = filterUserByRoles(
    getMembersInServerResponse as UserArray[],
    roleId
  );

  const responseData = checkDisplayType({
    displayType,
    msgToBeSent,
    usersWithMatchingRole,
  });
  return discordTextResponse(responseData);
}
