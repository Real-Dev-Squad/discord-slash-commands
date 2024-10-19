import { discordTextResponse } from "../utils/discordResponse";
import { SUPER_USER_ONE, SUPER_USER_TWO } from "../constants/variables";
import { env } from "../typeDefinitions/default.types";
import {
  messageRequestMember,
  messageRequestDataOptions,
} from "../typeDefinitions/discordMessage.types";
import { grantAWSAccess } from "../utils/awsAccess";

export async function grantAWSAccessCommand(
  transformedArgument: {
    member: messageRequestMember;
    userDetails: messageRequestDataOptions;
    awsGroupDetails: messageRequestDataOptions;
    channelId: number;
  },
  env: env,
  ctx: ExecutionContext
) {
  const isUserSuperUser = [SUPER_USER_ONE, SUPER_USER_TWO].includes(
    transformedArgument.member.user.id.toString()
  );
  if (!isUserSuperUser) {
    const responseText = `You're not authorized to make this request.`;
    return discordTextResponse(responseText);
  }
  const roleId = transformedArgument.userDetails.value;
  const groupId = transformedArgument.awsGroupDetails.value;
  const channelId = transformedArgument.channelId;

  return grantAWSAccess(roleId, groupId, env, ctx, channelId);
}
