import { DISCORD_BASE_URL } from "../../../src/constants/urls";
import JSONResponse from "../../../src/utils/JsonResponse";
import { removeUsers } from "../../../src/utils/removeUsers";

describe("removeUsers", () => {
  const mockEnv = {
    BOT_PUBLIC_KEY: "xyz",
    DISCORD_GUILD_ID: "123",
    DISCORD_TOKEN: "abc",
  };

  test("removes users successfully", async () => {
    const usersWithMatchingRole = ["<@userId1>", "<@userId2>"];

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new Response(null, { status: 204 }))
      );
    await removeUsers(mockEnv, usersWithMatchingRole);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      `${DISCORD_BASE_URL}/guilds/${mockEnv.DISCORD_GUILD_ID}/members/userId1`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
        },
      }
    );
    expect(fetch).toHaveBeenCalledWith(
      `${DISCORD_BASE_URL}/guilds/${mockEnv.DISCORD_GUILD_ID}/members/userId2`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
        },
      }
    );
  });
  test("handles errors", async () => {
    const usersWithMatchingRole = ["<@userId1>"];

    // Mocking the fetch function to simulate a rejected promise with a 404 error response
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.reject(new Response(null, { status: 404 }))
      );

    // Calling the function under test
    await removeUsers(mockEnv, usersWithMatchingRole);

    // Expectations
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(fetch).toHaveBeenCalledWith(
      `${DISCORD_BASE_URL}/guilds/${mockEnv.DISCORD_GUILD_ID}/members/userId1`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
        },
      }
    );
  });
});
