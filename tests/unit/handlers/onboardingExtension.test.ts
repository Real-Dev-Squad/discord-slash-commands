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
    transformedArgsForOnboardingExtension.member.user.id.toString();

  it("should return Feature not implemented", async () => {
    const expectedRes = await onboardingExtensionCommand(
      transformedArgsForOnboardingExtension,
      guildEnv,
      ctx
    );
    const jsonResponse = await expectedRes.json();
    const mockResponse = discordTextResponse(
      `<@${discordId}> Feature not implemented`
    );
    const mockJsonResponse = await mockResponse.json();
    expect(jsonResponse).toStrictEqual(mockJsonResponse);
  });

  it("should return initial response", async () => {
    transformedArgsForOnboardingExtension.dev.value = true;
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

  it("should call fetch", async () => {
    jest.spyOn(utils, "createOnboardingExtension");
    transformedArgsForOnboardingExtension.dev.value = true;
    await onboardingExtensionCommand(
      transformedArgsForOnboardingExtension,
      guildEnv,
      ctx
    );
    expect(utils.createOnboardingExtension).toHaveBeenCalledTimes(1);
  });
});
