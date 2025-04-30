import { onboardingExtensionCommand } from "../../../src/controllers/onboardingExtensionCommand";
import { discordTextResponse } from "../../../src/utils/discordResponse";
import {
  ctx,
  guildEnv,
  transformedArgsForOnboardingExtension,
} from "../../fixtures/fixture";
import * as utils from "../../../src/utils/onboardingExtension";

describe("onboardingExtensionCommand", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const discordId =
    transformedArgsForOnboardingExtension.memberObj.user.id.toString();

  it("should return initial response", async () => {
    transformedArgsForOnboardingExtension.devObj.value = true;
    const expectedRes = await onboardingExtensionCommand(
      transformedArgsForOnboardingExtension,
      guildEnv,
      ctx
    );
    const jsonResponse = await expectedRes.json();
    const mockResponse = discordTextResponse(
      `<@${discordId}> Processing your request for onboarding extension`
    );
    const mockJsonResponse = await mockResponse.json();
    expect(jsonResponse).toStrictEqual(mockJsonResponse);
  });

  it("should call createOnboardingExtension", async () => {
    jest.spyOn(utils, "createOnboardingExtension");
    transformedArgsForOnboardingExtension.devObj.value = true;
    await onboardingExtensionCommand(
      transformedArgsForOnboardingExtension,
      guildEnv,
      ctx
    );
    expect(utils.createOnboardingExtension).toHaveBeenCalledTimes(1);
    expect(utils.createOnboardingExtension).toHaveBeenCalledWith(
      {
        channelId: transformedArgsForOnboardingExtension.channelId,
        userId: transformedArgsForOnboardingExtension.userIdObj?.value,
        numberOfDays: Number(
          transformedArgsForOnboardingExtension.numberOfDaysObj.value
        ),
        reason: transformedArgsForOnboardingExtension.reasonObj.value,
        discordId: discordId,
      },
      guildEnv
    );
  });
});
