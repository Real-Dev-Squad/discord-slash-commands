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
    member: messageRequestMember;
    userId: messageRequestDataOptions;
    numberOfDays: messageRequestDataOptions;
    reason: messageRequestDataOptions;
    channelId: number;
    dev?: DevFlag;
  },
  env: env,
  ctx: ExecutionContext
) {
  const dev = transformedArgument.dev?.value || false;
  const discordId = transformedArgument.member.user.id.toString();

  if (!dev) {
    return discordTextResponse(`<@${discordId}> Feature not implemented`);
  }

  const args: CreateOnboardingExtensionArgs = {
    channelId: transformedArgument.channelId,
    userId: transformedArgument.userId.value,
    numberOfDays: Number(transformedArgument.numberOfDays.value),
    reason: transformedArgument.reason.value,
    discordId: discordId,
  };

  const initialResponse = `<@${discordId}> Processing your request for onboarding extension`;

  ctx.waitUntil(createOnboardingExtension(args, env));

  return discordTextResponse(initialResponse);
}
