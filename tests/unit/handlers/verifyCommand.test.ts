import * as response from "../../../src/constants/responses";
import { verifyCommand } from "../../../src/controllers/verifyCommand";
import config from "../../../config/config";
import JSONResponse from "../../../src/utils/JsonResponse";

type Responsetype = {
  data: DataType;
  type: number;
};

type DataType = {
  content: string;
  flags: number;
};
describe("verifyCommand", () => {
  test("should return INTERNAL_SERVER_ERROR when response is not ok", async () => {
    jest.mock("crypto", () => {
      return {
        randomUUID: jest.fn(() => "shreya"),
        subtle: { digest: jest.fn(() => "123") },
      };
    });

    jest.mock("../../../src/utils/generateUniqueToken", () => ({
      generateUniqueToken: () => Promise.resolve("jashdkjahskajhd"),
    }));

    const mockResponse = response.INTERNAL_SERVER_ERROR;
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );

    const env = {
      BOT_PUBLIC_KEY: "xyz",
      DISCORD_GUILD_ID: "123",
      DISCORD_TOKEN: "abc",
    };

    const result = await verifyCommand(
      1233434,
      "sjkhdkjashdksjh",
      "test user",
      "sndbhsbgdj",
      env
    );

    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:3000/external-accounts`,
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer asd`,
        },
      })
    );

    const response_: Responsetype = await result.json();
    expect(response_.data.content).toContain("");
  });

  test("should return JSON response when response is ok", async () => {
    const mockResponse = {};

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );

    const env = {
      BOT_PUBLIC_KEY: "xyz",
      DISCORD_GUILD_ID: "123",
      DISCORD_TOKEN: "abc",
    };

    const result = await verifyCommand(
      1233434,
      "sjkhdkjashdksjh",
      "test user",
      "sndbhsbgdj",
      env
    );

    const verificationSiteURL = config(env).VERIFICATION_SITE_URL;
    const message = `${verificationSiteURL}/discord?token=`;

    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:3000/external-accounts`,
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer asd`,
        },
      })
    );

    const response_: Responsetype = await result.json();

    expect(response_.data.content).toContain(message);
  });
});
