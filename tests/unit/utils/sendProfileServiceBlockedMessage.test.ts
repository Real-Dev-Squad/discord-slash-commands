import config from "../../../config/config";
import {
  INTERNAL_SERVER_ERROR,
  NAME_CHANGED,
} from "../../../src/constants/responses";
import { DISCORD_BASE_URL } from "../../../src/constants/urls";
import JSONResponse from "../../../src/utils/JsonResponse";
import { sendProfileServiceBlockedMessage } from "../../../src/utils/sendProfileServiceBlockedMessage";

describe("Send Profile Service Blocked Message", () => {
  const mockEnv = {
    BOT_PUBLIC_KEY: "xyz",
    DISCORD_GUILD_ID: "123",
    DISCORD_TOKEN: "abc",
  };

  const mockData = {
    discordId: "12345678910111213",
    reason: "Unauthenticated access to profile service",
  };

  test("should send the message if both userId and reason provided", async () => {
    const data = {
      content:
        "Hey <@" +
        mockData.discordId +
        ">,\nYour Profile Service is **BLOCKED** because of the below-mentioned reason. Please visit the [MY SITE](https://my.realdevsquad.com/identity) to fix this.\n**Reason:** `" +
        mockData.reason +
        "`",
    };
    const url = config(mockEnv).TRACKING_CHANNEL_URL;

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(NAME_CHANGED))
      );

    const response = await sendProfileServiceBlockedMessage(
      mockData.discordId,
      mockData.reason,
      mockEnv
    );

    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
      },
      body: JSON.stringify(data),
    });
  });

  test("should send the message if userId not present", async () => {
    const data = {
      content:
        "Hey,\nSomeone's Profile Service is **BLOCKED** because of the below-mentioned reason.\n**Reason:** `" +
        mockData.reason +
        "`",
    };
    const url = config(mockEnv).TRACKING_CHANNEL_URL;

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(NAME_CHANGED))
      );

    const response = await sendProfileServiceBlockedMessage(
      "",
      mockData.reason,
      mockEnv
    );

    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
      },
      body: JSON.stringify(data),
    });
  });

  test("should send the message if both are not present", async () => {
    const data = {
      content:
        "Hey,\nSomeone's Profile Service is **BLOCKED** because of the below-mentioned reason.\n**Reason:** `No reason provided`",
    };
    const url = config(mockEnv).TRACKING_CHANNEL_URL;

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(NAME_CHANGED))
      );

    const response = await sendProfileServiceBlockedMessage("", "", mockEnv);

    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
      },
      body: JSON.stringify(data),
    });
  });

  test("should send the message if reason is not not present", async () => {
    const data = {
      content:
        "Hey <@" +
        mockData.discordId +
        ">,\nYour Profile Service is **BLOCKED** because of the below-mentioned reason. Please visit the [MY SITE](https://my.realdevsquad.com/identity) to fix this.\n**Reason:** `No reason provided`",
    };
    const url = config(mockEnv).TRACKING_CHANNEL_URL;

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(NAME_CHANGED))
      );

    const response = await sendProfileServiceBlockedMessage(
      mockData.discordId,
      "",
      mockEnv
    );

    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
      },
      body: JSON.stringify(data),
    });
  });
});
