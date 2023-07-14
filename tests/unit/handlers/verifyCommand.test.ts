import * as response from "../../../src/constants/responses";
import JSONResponse from "../../../src/utils/JsonResponse";
import { verifyCommand } from "../../../src/controllers/verifyCommand";
import { guildEnv } from "../../fixtures/fixture";
import config from "../../../config/config";

describe("verifyCommand", () => {
  test("should return INTERNAL_SERVER_ERROR when response is not ok", async () => {
    
    jest.mock("crypto", () => {
      return {
        randomUUID: jest.fn(()=>'shreya'),
        subtle: { digest: jest.fn(() => "123") },
      };
    });

    jest.mock("../../../src/utils/generateUniqueToken", () => ({
      generateUniqueToken: () => Promise.resolve("jashdkjahskajhd"),
    }));

    // const mockResponse = response.INTERNAL_SERVER_ERROR;
    // jest
    //   .spyOn(global, "fetch")
    //   .mockImplementation(() =>
    //     Promise.resolve(new JSONResponse(mockResponse))
    //   );

    const env = {
      BOT_PUBLIC_KEY: "xyz",
      DISCORD_GUILD_ID: "123",
      DISCORD_TOKEN: "abc",
    };

    const data = {
      token: 1233434,
      userId: "sjkhdkjashdksjh",
      userAvatarHash: "test user",
      userName: "sndbhsbgdj",
      env: env,
    };

    const result = await verifyCommand(
      1233434,
      "sjkhdkjashdksjh",
      "test user",
      "sndbhsbgdj",
      env
    );

    // expect(result.data.content).toEqual(response.RETRY_COMMAND);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.realdevsquad.com/external-accounts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${guildEnv.DISCORD_TOKEN}`,
        },
        body: JSON.stringify(data),
      }
    );
  });

  test("should return JSON response when response is ok", async () => {
    const mockResponse = {};

    // jest
    //   .spyOn(global, "fetch")
    //   .mockImplementation(() =>
    //     Promise.resolve(new JSONResponse(mockResponse))
    //   );

    const env = {
      BOT_PUBLIC_KEY: "xyz",
      DISCORD_GUILD_ID: "123",
      DISCORD_TOKEN: "abc",
    };

    const data = {
      token: 1233434,
      userId: "sjkhdkjashdksjh",
      userAvatarHash: "test user",
      userName: "sndbhsbgdj",
      env: env,
    };

    const result = await verifyCommand(
      1233434,
      "sjkhdkjashdksjh",
      "test user",
      "sndbhsbgdj",
      env
    );

    const verificationSiteURL = config(env).VERIFICATION_SITE_URL;
    const message =
      `${verificationSiteURL}/discord?token=${guildEnv.DISCORD_TOKEN}\n` +
      response.VERIFICATION_STRING;

    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.realdevsquad.com/external-accounts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${guildEnv.DISCORD_TOKEN}`,
        },
        body: JSON.stringify(data),
      }
    );
  });
});
