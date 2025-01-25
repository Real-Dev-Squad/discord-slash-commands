import { env } from "../typeDefinitions/default.types";
import {
  messageRequestDataOptions,
  messageRequestMember,
} from "../typeDefinitions/discordMessage.types";
import { DevFlag } from "../typeDefinitions/filterUsersByRole";
import { discordTextResponse } from "../utils/discordResponse";
import {
  createOnboardingExtension,
  CreateOnboardingExtensionArgs,
} from "../utils/onboardingExtension";

export async function onboardingExtensionCommand(
  transformedArgument: {
    memberObj: messageRequestMember;
    userIdObj?: messageRequestDataOptions;
    numberOfDaysObj: messageRequestDataOptions;
    reasonObj: messageRequestDataOptions;
    channelId: number;
    devObj?: DevFlag;
  },
  env: env,
  ctx: ExecutionContext
) {
  const dev = transformedArgument.devObj?.value || false;
  const discordId = transformedArgument.memberObj.user.id.toString();

  if (!dev) {
    return discordTextResponse(`<@${discordId}> Feature not implemented`);
  }

  const args: CreateOnboardingExtensionArgs = {
    channelId: transformedArgument.channelId,
    userId: transformedArgument.userIdObj?.value,
    numberOfDays: Number(transformedArgument.numberOfDaysObj.value),
    reason: transformedArgument.reasonObj.value,
    discordId: discordId,
  };

  const initialResponse = `<@${discordId}> Processing your request for onboarding extension`;

  ctx.waitUntil(createOnboardingExtension(args, env));

  return discordTextResponse(initialResponse);
}
