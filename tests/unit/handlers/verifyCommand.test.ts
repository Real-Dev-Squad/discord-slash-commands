import {
  RETRY_COMMAND,
  VERIFICATION_STRING,
} from "../../../src/constants/responses";
import config from "../../../config/config";

const mockDateNow = 1626512345678;
const UNIQUE_TOKEN = "UNIQUE_TOKEN";
const env = {
  BOT_PUBLIC_KEY: "BOT_PUBLIC_KEY",
  DISCORD_GUILD_ID: "DISCORD_GUILD_ID",
  DISCORD_TOKEN: "SIGNED_JWT",
};

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

  test("should return JSON response when response is ok", async () => {
    const data = {
      type: "discord",
      token: UNIQUE_TOKEN,
      attributes: {
        discordId: 1,
        userAvatar: "https://cdn.discordapp.com/avatars/1/userAvatarHash.jpg",
        userName: "userName",
        discriminator: "discriminator",
        expiry: mockDateNow + 1000 * 60 * 2,
      },
    };

    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce(data),
    } as unknown as Response);

    const { verifyCommand } = await import(
      "../../../src/controllers/verifyCommand"
    );

    const result = await verifyCommand(
      1,
      "userAvatarHash",
      "userName",
      "discriminator",
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
        body: JSON.stringify(data),
      }
    );
    const resultText = await result.text();
    const resultData = JSON.parse(resultText);

    const verificationSiteURL = config(env).VERIFICATION_SITE_URL;
    const message =
      `${verificationSiteURL}/discord?token=${UNIQUE_TOKEN}\n` +
      VERIFICATION_STRING;

    expect(resultData.data.content).toEqual(message);
  });

  test("should return INTERNAL_SERVER_ERROR when response is not ok", async () => {
    const data = {
      type: "discord",
      token: UNIQUE_TOKEN,
      attributes: {
        discordId: 1,
        userAvatar: "https://cdn.discordapp.com/avatars/1/userAvatarHash.jpg",
        userName: "userName",
        discriminator: "discriminator",
        expiry: mockDateNow + 1000 * 60 * 2,
      },
    };

    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 400, // ERROR STATUS
      json: jest.fn().mockResolvedValueOnce(data),
    } as unknown as Response);

    const { verifyCommand } = await import(
      "../../../src/controllers/verifyCommand"
    );
    const result = await verifyCommand(
      1233434,
      "sjkhdkjashdksjh",
      "test user",
      "sndbhsbgdj",
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
        body: JSON.stringify(data),
      }
    );
    const resultText = await result.text();
    const resultData = JSON.parse(resultText);

    expect(resultData.data.content).toEqual(RETRY_COMMAND);
  });
});
