import { DISCORD_BASE_URL } from "../../../src/constants/urls";
import JSONResponse from "../../../src/utils/JsonResponse";
import { getGuildMemberDetails } from "../../../src/utils/getGuildMemberDetails";
import { dummyGuildMemberDetails } from "../../fixtures/fixture";

describe("get guild member details", () => {
  const mockEnv = {
    BOT_PUBLIC_KEY: "xyz",
    DISCORD_GUILD_ID: "123",
    DISCORD_TOKEN: "abc",
  };
  const mockUserId = "12345678";
  const GET_GUILD_MEMBER_URL = `${DISCORD_BASE_URL}/guilds/${mockEnv.DISCORD_GUILD_ID}/members/${mockUserId}`;

  test("returns JSON response with member's details on success", async () => {
    const expectedResponse = dummyGuildMemberDetails;

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(expectedResponse))
      );

    const response = await getGuildMemberDetails(mockUserId, mockEnv);

    expect(global.fetch).toHaveBeenCalledWith(GET_GUILD_MEMBER_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
      },
    });

    expect(response).toEqual(expectedResponse);
  });
});
