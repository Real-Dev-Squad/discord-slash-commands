import { createNewRole } from "../../src/typeDefinitions/discordMessage.types";
import JSONResponse from "../../src/utils/JsonResponse";
import * as response from "../../src/constants/responses";
import { createGuildRole, addGroupRole } from "../../src/utils/guildRole";

describe("createGuildRole", () => {
  test("should return INTERNAL_SERVER_ERROR when response is not ok", async () => {
    const mockEnv = {
      DISCORD_GUILD_ID: "1234",
      DISCORD_TOKEN: "abcd",
    };
    const mockBody: createNewRole = {
      rolename: "test role",
      mentionable: true,
    };
    const mockResponse = response.INTERNAL_SERVER_ERROR;
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );

    const result = await createGuildRole(mockBody, mockEnv);

    expect(result).toEqual(response.INTERNAL_SERVER_ERROR);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://discord.com/api/v10/guilds/${mockEnv.DISCORD_GUILD_ID}/roles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
        },
        body: JSON.stringify({
          ...mockBody,
          name: mockBody.rolename,
        }),
      }
    );
  });

  test("should return JSON response when response is ok", async () => {
    const mockEnv = {
      DISCORD_GUILD_ID: "1234",
      DISCORD_TOKEN: "abcd",
    };
    const mockBody: createNewRole = {
      rolename: "test role",
      mentionable: true,
    };
    const mockResponse = {};
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );

    const result = await createGuildRole(mockBody, mockEnv);

    expect(result).toEqual({});
    expect(global.fetch).toHaveBeenCalledWith(
      `https://discord.com/api/v10/guilds/${mockEnv.DISCORD_GUILD_ID}/roles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
        },
        body: JSON.stringify({
          ...mockBody,
          name: mockBody.rolename,
        }),
      }
    );
  });
});

describe("addGroupRole", () => {
  test("should return success message when response is ok", async () => {
    const mockEnv = {
      DISCORD_GUILD_ID: "1234",
      DISCORD_TOKEN: "abcd",
    };
    const mockBody = {
      userid: "abcd1234",
      roleid: "defg5678",
    };
    const mockResponse = {
      ok: true,
    };
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );

    const result = await addGroupRole(mockBody, mockEnv);

    expect(result).toEqual({ message: "Role added successfully" });
    expect(global.fetch).toHaveBeenCalledWith(
      `https://discord.com/api/v10/guilds/${mockEnv.DISCORD_GUILD_ID}/members/${mockBody.userid}/roles/${mockBody.roleid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
        },
      }
    );
  });
});
