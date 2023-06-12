import { DISCORD_BASE_URL } from "../../../src/constants/urls";
import { getGuildMemberDetails } from "../../../src/utils/getGuildMemberDetails";
import { dummyGuildMemberDetails } from "../../fixtures/fixture";

describe("getGuildMemberDetails", () => {
  const mockEnv = {
    BOT_PUBLIC_KEY: "xyz",
    DISCORD_GUILD_ID: "123",
    DISCORD_TOKEN: "abc",
  };
  const mockUserId = "12345678";
  const GET_GUILD_MEMBER_URL = `${DISCORD_BASE_URL}/guilds/${mockEnv.DISCORD_GUILD_ID}/members/${mockUserId}`;
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("returns member details on success", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(dummyGuildMemberDetails),
    } as unknown as Response);

    const result = await getGuildMemberDetails(mockUserId, mockEnv);

    expect(global.fetch).toHaveBeenCalledWith(GET_GUILD_MEMBER_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
      },
    });

    expect(result).toEqual(dummyGuildMemberDetails);
  });

  test("returns INTERNAL_SERVER_ERROR on non-ok response", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
    } as unknown as Response);

    const result = await getGuildMemberDetails(mockUserId, mockEnv);

    expect(global.fetch).toHaveBeenCalledWith(GET_GUILD_MEMBER_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
      },
    });

    expect(result).toEqual(
      "Oops! We have encountered an internal Server Error"
    );
  });

  test("returns INTERNAL_SERVER_ERROR on fetch error", async () => {
    jest
      .spyOn(global, "fetch")
      .mockRejectedValueOnce(new Error("Network error"));

    const result = await getGuildMemberDetails(mockUserId, mockEnv);

    expect(global.fetch).toHaveBeenCalledWith(GET_GUILD_MEMBER_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
      },
    });

    expect(result).toEqual(
      "Oops! We have encountered an internal Server Error"
    );
  });
});
