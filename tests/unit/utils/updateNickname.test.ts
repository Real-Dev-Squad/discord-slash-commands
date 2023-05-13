import {
  INTERNAL_SERVER_ERROR,
  NAME_CHANGED,
} from "../../../src/constants/responses";
import { DISCORD_BASE_URL } from "../../../src/constants/urls";
import JSONResponse from "../../../src/utils/JsonResponse";
import { updateNickName } from "../../../src/utils/updateNickname";

describe("Update nickname", () => {
  const mockEnv = {
    BOT_PUBLIC_KEY: "xyz",
    DISCORD_GUILD_ID: "123",
    DISCORD_TOKEN: "abc",
  };

  const mockData = { discordId: "12345678910111213", nickname: "jhon" };

  test("updatenickname fetch is called with expected parameters", async () => {
    const data = { nick: mockData.nickname };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(NAME_CHANGED))
      );

    const response = await updateNickName(
      mockData.discordId,
      mockData.nickname,
      mockEnv
    );

    expect(global.fetch).toHaveBeenCalledWith(
      `${DISCORD_BASE_URL}/guilds/${mockEnv.DISCORD_GUILD_ID}/members/${mockData.discordId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
        },
        body: JSON.stringify(data),
      }
    );

    expect(response).toEqual(NAME_CHANGED);
  });

  test("Return Internal server error for improper body", async () => {
    jest
      .spyOn(global, "fetch")
      .mockRejectedValue(() =>
        Promise.resolve(new JSONResponse({ INTERNAL_SERVER_ERROR }))
      );

    const response = await updateNickName(mockData.discordId, "", mockEnv);

    expect(response).toEqual(INTERNAL_SERVER_ERROR);

    expect(global.fetch).toHaveBeenCalledWith(
      `${DISCORD_BASE_URL}/guilds/${mockEnv.DISCORD_GUILD_ID}/members/${mockData.discordId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
        },
        body: JSON.stringify({ nick: "" }),
      }
    );
  });
});
