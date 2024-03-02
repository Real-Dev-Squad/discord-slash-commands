import config from "../../../config/config";
import JSONResponse from "../../../src/utils/JsonResponse";
import {
  generateStringToBeSent,
  sendProfileServiceBlockedMessage,
} from "../../../src/utils/sendProfileServiceBlockedMessage";

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
    const url = config(mockEnv).TRACKING_CHANNEL_URL;
    const data = {
      content: generateStringToBeSent(
        mockData.discordId,
        mockData.reason,
        mockEnv
      ),
    };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse("")));

    await sendProfileServiceBlockedMessage(
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
      content: generateStringToBeSent("", mockData.reason, mockEnv),
    };
    const url = config(mockEnv).TRACKING_CHANNEL_URL;

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse("")));

    await sendProfileServiceBlockedMessage("", mockData.reason, mockEnv);

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
      content: generateStringToBeSent("", "", mockEnv),
    };
    const url = config(mockEnv).TRACKING_CHANNEL_URL;

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse("")));

    await sendProfileServiceBlockedMessage("", "", mockEnv);

    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
      },
      body: JSON.stringify(data),
    });
  });

  test("should send the message if reason is not present", async () => {
    const data = {
      content: generateStringToBeSent(mockData.discordId, "", mockEnv),
    };
    const url = config(mockEnv).TRACKING_CHANNEL_URL;

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse("")));

    await sendProfileServiceBlockedMessage(mockData.discordId, "", mockEnv);

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
