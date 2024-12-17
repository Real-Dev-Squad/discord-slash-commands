import config from "../../../config/config";
import { DISCORD_BASE_URL } from "../../../src/constants/urls";
import { generateDiscordAuthToken } from "../../../src/utils/authTokenGenerator";
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
  const errorContent = `<@${args.discordId}> Error occurred while creating onboarding extension request.`;
  const createOnboardingExtensionUrl = `${base_url}/requests?dev=true`;
  let fetchSpy: jest.SpyInstance;
  let authToken: string;

  const requestData = {
    userId: args.userId,
    type: "ONBOARDING",
    numberOfDays: args.numberOfDays,
    requestedBy: args.discordId,
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

  it("should call fetch with error response", async () => {
    fetchSpy.mockImplementation(() => {
      throw new Error();
    });
    try {
      await createOnboardingExtension(args, guildEnv);
    } catch (err) {
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenCalledWith(createOnboardingExtensionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(requestData),
      });
      expect(utils.sendReplyInDiscordChannel).toHaveBeenCalledTimes(1);
      expect(utils.sendReplyInDiscordChannel).toHaveBeenCalledWith(
        discordReplyUrl,
        errorContent,
        guildEnv
      );
    }
  });

  it("should call fetch with success response", async () => {
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
    expect(utils.sendReplyInDiscordChannel).toHaveBeenCalledTimes(1);
  });
});
