import { discordTextResponse } from "../utils/discordResponse";
import { filterUserByRoles } from "../utils/filterUsersByRole";
import { getMembersInServer } from "../utils/getMembersInServer";

import { env } from "../typeDefinitions/default.types";
import { messageRequestDataOptions } from "../typeDefinitions/discordMessage.types";
import {UserArray} from '../typeDefinitions/filterUsersByRole.types'



export async function mentionEachUser(
  message: { displayType: string; options: Array<messageRequestDataOptions> },
  env: env
) {
  let responseData;

  const getMembersInServerResponse = await getMembersInServer(env);

  // displaytype is list or series  & options is first level of options array on desctructure
  const { displayType, options } = message;
  const [roleToBeTaggedObj, displayMessageObj] = options[0].options;

  const roleId = roleToBeTaggedObj.value;
  const msgToBeSent = displayMessageObj.value;

  const usersWithMatchingRole = filterUserByRoles(
    getMembersInServerResponse as UserArray[],
    roleId
  );

  if (displayType === "list") {
    responseData = `Coming soon. We are working on this feature. We feel sorry for not serving you what you expect this command to do for now.(T_T) `;
  } else {
    responseData = `${displayType && msgToBeSent} ${usersWithMatchingRole}`;
  }
  return discordTextResponse(responseData);
}
