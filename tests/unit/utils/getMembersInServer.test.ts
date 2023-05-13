import { DISCORD_BASE_URL } from "../../../src/constants/urls";
import JSONResponse from "../../../src/utils/JsonResponse";
import { getMembersInServer } from "../../../src/utils/getMembersInServer";

describe("getMembersInServer", () => {
  const mockEnv = {
    BOT_PUBLIC_KEY: "xyz",
    DISCORD_GUILD_ID: "123",
    DISCORD_TOKEN: "abc",
  };
  test("returns JSON response with members on success", async () => {
    const expectedResponse = [{ id: "1234", name: "John Doe" }];

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(expectedResponse))
      );

    const response = await getMembersInServer(mockEnv);

    expect(global.fetch).toHaveBeenCalledWith(
      `${DISCORD_BASE_URL}/guilds/${mockEnv.DISCORD_GUILD_ID}/members?limit=1000`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
        },
      }
    );

    expect(response).toEqual(expectedResponse);
  });
});
