import {
  RETRY_COMMAND,
  VERIFICATION_STRING,
  VERIFICATION_SUBSTRING,
} from "../../../src/constants/responses";
import config from "../../../config/config";
import {
  UNIQUE_TOKEN,
  discordUserData,
  env,
  mockDateNow,
} from "../../fixtures/fixture";
import { DevFlag } from "../../../src/typeDefinitions/verify.types";

describe("verifyCommand", () => {
  beforeEach(() => {
    jest.mock("@tsndr/cloudflare-worker-jwt");
    jest.spyOn(Date, "now").mockReturnValue(mockDateNow);
    jest.mock("../../../src/utils/generateUniqueToken", () => ({
      generateUniqueToken: () => Promise.resolve(UNIQUE_TOKEN),
    }));
  });

  afterEach(() => {
    jest.spyOn(Date, "now").mockRestore();
  });

  test("should return message with verification site url when dev is false", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce(discordUserData),
    } as unknown as Response);

    const { verifyCommand } = await import(
      "../../../src/controllers/verifyCommand"
    );

    const result = await verifyCommand(
      1,
      "userAvatarHash",
      "userName",
      "discriminator",
      "2021-07-25T19:25:16.172000+00:00",
      env,
      {
        value: false,
        type: 5,
        name: "dev",
      } as DevFlag
    );

    const resultText = await result.text();
    const resultData = JSON.parse(resultText);

    const verificationSiteURL = config(env).VERIFICATION_SITE_URL;
    const message = `${VERIFICATION_STRING}\n${verificationSiteURL}/discord?token=${UNIQUE_TOKEN}\n${VERIFICATION_SUBSTRING}`;
    expect(resultData.data.content).toEqual(message);
  });

  test("should return message with verification site url when dev is true", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce(discordUserData),
    } as unknown as Response);

    const { verifyCommand } = await import(
      "../../../src/controllers/verifyCommand"
    );

    const result = await verifyCommand(
      1,
      "userAvatarHash",
      "userName",
      "discriminator",
      "2021-07-25T19:25:16.172000+00:00",
      env,
      { value: true, type: 5, name: "dev" } as DevFlag
    );

    const resultText = await result.text();
    const resultData = JSON.parse(resultText);

    const verificationSiteURL = config(env).MAIN_SITE_URL;
    const message = `${VERIFICATION_STRING}\n${verificationSiteURL}/discord?dev=true&token=${UNIQUE_TOKEN}\n${VERIFICATION_SUBSTRING}`;
    expect(resultData.data.content).toEqual(message);
  });

  test("should return JSON response when response is ok", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce(discordUserData),
    } as unknown as Response);

    const { verifyCommand } = await import(
      "../../../src/controllers/verifyCommand"
    );

    const result = await verifyCommand(
      1,
      "userAvatarHash",
      "userName",
      "discriminator",
      "2021-07-25T19:25:16.172000+00:00",
      env
    );

    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:3000/external-accounts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.DISCORD_TOKEN}`,
        },
        body: JSON.stringify(discordUserData),
      }
    );
    const resultText = await result.text();
    const resultData = JSON.parse(resultText);

    const verificationSiteURL = config(env).VERIFICATION_SITE_URL;
    const message = `${VERIFICATION_STRING}\n${verificationSiteURL}/discord?token=${UNIQUE_TOKEN}\n${VERIFICATION_SUBSTRING}`;
    expect(resultData.data.content).toEqual(message);
  });

  test("should return INTERNAL_SERVER_ERROR when response is not ok", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 400, // ERROR STATUS
      json: jest.fn().mockResolvedValueOnce(discordUserData),
    } as unknown as Response);

    const { verifyCommand } = await import(
      "../../../src/controllers/verifyCommand"
    );
    const result = await verifyCommand(
      1233434,
      "sjkhdkjashdksjh",
      "test user",
      "sndbhsbgdj",
      "2021-07-25T19:25:16.172000+00:00",
      env
    );

    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:3000/external-accounts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.DISCORD_TOKEN}`,
        },
        body: JSON.stringify(discordUserData),
      }
    );
    const resultText = await result.text();
    const resultData = JSON.parse(resultText);

    expect(resultData.data.content).toEqual(RETRY_COMMAND);
  });
});
