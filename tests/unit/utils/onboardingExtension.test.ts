import config from "../../../config/config";
import { UNAUTHORIZED_TO_CREATE_ONBOARDING_EXTENSION_REQUEST } from "../../../src/constants/responses";
import { DISCORD_BASE_URL } from "../../../src/constants/urls";
import { generateDiscordAuthToken } from "../../../src/utils/authTokenGenerator";
import JSONResponse from "../../../src/utils/JsonResponse";
import {
  createOnboardingExtension,
  CreateOnboardingExtensionArgs,
} from "../../../src/utils/onboardingExtension";
import * as utils from "../../../src/utils/sendReplyInDiscordChannel";
import { env, guildEnv } from "../../fixtures/fixture";

describe("createOnboaringExtension", () => {
  const args: CreateOnboardingExtensionArgs = {
    channelId: 123456789,
    discordId: "4574263",
    numberOfDays: 2,
    reason: "This is reason",
    userId: "1462465462546",
  };
  const discordReplyUrl = `${DISCORD_BASE_URL}/channels/${args.channelId}/messages`;
  const base_url = config(env).RDS_BASE_API_URL;
  const createOnboardingExtensionUrl = `${base_url}/requests?dev=true`;
  let fetchSpy: jest.SpyInstance;
  let authToken: string;

  const requestData = {
    userId: args.userId,
    type: "ONBOARDING",
    numberOfDays: args.numberOfDays,
    reason: args.reason,
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    fetchSpy = jest.spyOn(global, "fetch");
    jest.spyOn(utils, "sendReplyInDiscordChannel");
    authToken = await generateDiscordAuthToken(
      "Cloudflare Worker",
      Math.floor(Date.now() / 1000) + 2,
      guildEnv.DISCORD_TOKEN,
      "RS256"
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should call sendReplyInDicordChannel when user is not a super user", async () => {
    fetchSpy.mockImplementation(() => new JSONResponse(null));
    await createOnboardingExtension(args, guildEnv);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(utils.sendReplyInDiscordChannel).toHaveBeenCalledTimes(1);
    expect(utils.sendReplyInDiscordChannel).toHaveBeenCalledWith(
      discordReplyUrl,
      `<@${args.discordId}> ${UNAUTHORIZED_TO_CREATE_ONBOARDING_EXTENSION_REQUEST}`,
      guildEnv
    );
  });

  it("should call sendReplyInDiscordChannel with error response for invalid request body", async () => {
    const message = "numberOfDays must be positive";
    const errorContent = `<@${args.discordId}> ${message}`;
    const response = new JSONResponse({ message });

    fetchSpy.mockImplementation(() => response);

    args.numberOfDays = -1;
    args.userId = undefined;
    requestData.numberOfDays = args.numberOfDays;

    await createOnboardingExtension(args, guildEnv);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(utils.sendReplyInDiscordChannel).toHaveBeenCalledTimes(1);
    expect(utils.sendReplyInDiscordChannel).toHaveBeenCalledWith(
      discordReplyUrl,
      errorContent,
      guildEnv
    );
  });

  it("should call sendReplyInDiscordChannel with error content for unexpected error", async () => {
    fetchSpy.mockImplementation(() => {
      throw new Error("Unexpected Error");
    });
    try {
      await createOnboardingExtension(args, guildEnv);
    } catch (error) {
      expect(utils.sendReplyInDiscordChannel).toHaveBeenCalledTimes(1);
      expect(utils.sendReplyInDiscordChannel).toHaveBeenCalledWith(
        discordReplyUrl,
        `<@${
          args.discordId
        }> ${"Error occurred while creating onboarding extension request."}`,
        guildEnv
      );
    }
  });

  it("should call sendReplyInDiscordChannel  with success response", async () => {
    args.userId = undefined;
    requestData.userId = args.discordId;
    await createOnboardingExtension(args, guildEnv);

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(createOnboardingExtensionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(requestData),
    });
  });
});
