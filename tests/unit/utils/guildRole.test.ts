import JSONResponse from "../../../src/utils/JsonResponse";
import * as response from "../../../src/constants/responses";
import {
  createGuildRole,
  addGroupRole,
  removeGuildRole,
} from "../../../src/utils/guildRole";
import {
  dummyAddRoleBody,
  dummyCreateBody,
  guildEnv,
} from "../../fixtures/fixture";

describe("createGuildRole", () => {
  test("should return INTERNAL_SERVER_ERROR when response is not ok", async () => {
    const mockResponse = response.INTERNAL_SERVER_ERROR;
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );

    const result = await createGuildRole(dummyCreateBody, guildEnv);

    expect(result).toEqual(response.INTERNAL_SERVER_ERROR);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://discord.com/api/v10/guilds/${guildEnv.DISCORD_GUILD_ID}/roles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${guildEnv.DISCORD_TOKEN}`,
        },
        body: JSON.stringify({
          ...dummyCreateBody,
          name: dummyCreateBody.rolename,
        }),
      }
    );
  });

  test("should return JSON response when response is ok", async () => {
    const mockResponse = {};
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );

    const result = await createGuildRole(dummyCreateBody, guildEnv);

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://discord.com/api/v10/guilds/${guildEnv.DISCORD_GUILD_ID}/roles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${guildEnv.DISCORD_TOKEN}`,
        },
        body: JSON.stringify({
          ...dummyCreateBody,
          name: dummyCreateBody.rolename,
        }),
      }
    );
  });
});

describe("addGroupRole", () => {
  test("should return success message when response is ok", async () => {
    const mockResponse = {
      ok: true,
    };
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );

    const result = await addGroupRole(dummyAddRoleBody, guildEnv);

    expect(result).toEqual({ message: "Role added successfully" });
    expect(global.fetch).toHaveBeenCalledWith(
      `https://discord.com/api/v10/guilds/${guildEnv.DISCORD_GUILD_ID}/members/${dummyAddRoleBody.userid}/roles/${dummyAddRoleBody.roleid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${guildEnv.DISCORD_TOKEN}`,
        },
      }
    );
  });
});

describe("removeGuildRole", () => {
  test("Should return success message on proper response", async () => {
    const mockResponse = {
      ok: true,
    };
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );
    const result = await removeGuildRole(dummyAddRoleBody, guildEnv);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://discord.com/api/v10/guilds/${guildEnv.DISCORD_GUILD_ID}/members/${dummyAddRoleBody.userid}/roles/${dummyAddRoleBody.roleid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${guildEnv.DISCORD_TOKEN}`,
        },
      }
    );
    expect(result).toEqual({
      message: response.ROLE_REMOVED,
      userAffected: {
        userid: dummyAddRoleBody.userid,
        roleid: dummyAddRoleBody.roleid,
      },
    });
  });
  test("Should return internal error response on api failure", async () => {
    jest.spyOn(global, "fetch").mockRejectedValue("Oops some error");
    const result = await removeGuildRole(dummyAddRoleBody, guildEnv);
    expect(result).toEqual(response.INTERNAL_SERVER_ERROR);
  });
});
