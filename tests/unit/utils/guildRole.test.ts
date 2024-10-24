import JSONResponse from "../../../src/utils/JsonResponse";
import * as response from "../../../src/constants/responses";
import {
  createGuildRole,
  addGroupRole,
  removeGuildRole,
  getGuildRoles,
  getGuildRoleByName,
  mentionEachUserInMessage,
  deleteGuildRole,
} from "../../../src/utils/guildRole";
import {
  dummyAddRoleBody,
  dummyCreateBody,
  guildEnv,
  mockMessageResponse,
  rolesMock,
} from "../../fixtures/fixture";
import { DiscordMessageResponse } from "../../../src/typeDefinitions/discordMessage.types";
import { DISCORD_BASE_URL } from "../../../src/constants/urls";

describe("deleteGuildRole", () => {
  const roleId = "1A32BEX04";
  const deleteGuildRoleUrl = `${DISCORD_BASE_URL}/guilds/${guildEnv.DISCORD_GUILD_ID}/roles/${roleId}`;
  const mockRequestInit = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${guildEnv.DISCORD_TOKEN}`,
      "X-Audit-Log-Reason": "This is reason for this action",
    },
  };

  it("should pass the reason to discord as a X-Audit-Log-Reason header if provided", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation((inp) => Promise.resolve(new JSONResponse(inp)));

    await deleteGuildRole(guildEnv, roleId, "This is reason for this action");

    expect(global.fetch).toHaveBeenCalledWith(
      deleteGuildRoleUrl,
      mockRequestInit
    );
  });

  it("should return an empty response with 204 status", async () => {
    const mockResponse = new Response(null, {
      status: 204,
    });
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(mockResponse));
    const response = (await deleteGuildRole(guildEnv, roleId)) as Response;
    expect(response).toEqual(mockResponse);
    expect(response.status).toEqual(mockResponse.status);
    expect(global.fetch).toHaveBeenCalledWith(
      deleteGuildRoleUrl,
      mockRequestInit
    );
  });

  it("should return INTERNAL_SERVER_ERROR when response is not ok", async () => {
    const mockErrorResponse = new JSONResponse(response.INTERNAL_SERVER_ERROR);
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(mockErrorResponse));
    const result = await deleteGuildRole(guildEnv, roleId);
    expect(result).toEqual(mockErrorResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      deleteGuildRoleUrl,
      mockRequestInit
    );
  });
});

describe("createGuildRole", () => {
  it("should pass the reason to discord as a X-Audit-Log-Reason header if provided", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation((inp) => Promise.resolve(new JSONResponse(inp)));

    await createGuildRole(
      dummyCreateBody,
      guildEnv,
      "This is reason for this action"
    );

    expect(global.fetch).toHaveBeenCalledWith(
      `https://discord.com/api/v10/guilds/${guildEnv.DISCORD_GUILD_ID}/roles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${guildEnv.DISCORD_TOKEN}`,
          "X-Audit-Log-Reason": "This is reason for this action",
        },
        body: JSON.stringify({
          ...dummyCreateBody,
          name: dummyCreateBody.rolename,
        }),
      }
    );
  });
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
  it("should pass the reason to discord as a X-Audit-Log-Reason header if provided", async () => {
    const mockResponse = {
      ok: true,
    };
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );

    const result = await addGroupRole(
      dummyAddRoleBody,
      guildEnv,
      "This is a reason"
    );

    expect(result).toEqual({ message: "Role added successfully" });
    expect(global.fetch).toHaveBeenCalledWith(
      `https://discord.com/api/v10/guilds/${guildEnv.DISCORD_GUILD_ID}/members/${dummyAddRoleBody.userid}/roles/${dummyAddRoleBody.roleid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${guildEnv.DISCORD_TOKEN}`,
          "X-Audit-Log-Reason": "This is a reason",
        },
      }
    );
  });
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
  test("should pass the reason to discord as a X-Audit-Log-Reason header if provided", async () => {
    const mockResponse = {
      ok: true,
    };
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );
    const result = await removeGuildRole(
      dummyAddRoleBody,
      guildEnv,
      "this is reason"
    );
    expect(global.fetch).toHaveBeenCalledWith(
      `https://discord.com/api/v10/guilds/${guildEnv.DISCORD_GUILD_ID}/members/${dummyAddRoleBody.userid}/roles/${dummyAddRoleBody.roleid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${guildEnv.DISCORD_TOKEN}`,
          "X-Audit-Log-Reason": "this is reason",
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

describe("getGuildRoles", () => {
  it("should throw role fetch failed error if status is not ok", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(async () =>
        Promise.resolve(new JSONResponse({}, { status: 500 }))
      );

    await expect(getGuildRoles(guildEnv)).rejects.toThrow(
      response.ROLE_FETCH_FAILED
    );
  });

  it("should throw role fetch failed error if discord request fails", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(async () =>
        Promise.reject(new JSONResponse({}, { status: 500 }))
      );

    await expect(getGuildRoles(guildEnv)).rejects.toThrow(
      response.ROLE_FETCH_FAILED
    );
  });

  it("should return array of objects containing role_id and role_name", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(async () =>
        Promise.resolve(new JSONResponse(rolesMock))
      );
    const roles = await getGuildRoles(guildEnv);
    const expectedRoles = rolesMock.map(({ id, name }) => ({
      id,
      name,
    }));
    expect(roles).toEqual(expectedRoles);
  });
});

describe("getGuildRolesByName", () => {
  it("should throw role fetch failed message if status is not ok", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(async () =>
        Promise.resolve(new JSONResponse({}, { status: 500 }))
      );
    await expect(getGuildRoles(guildEnv)).rejects.toThrow(
      response.ROLE_FETCH_FAILED
    );
  });

  it("should throw role fetch failed message if discord request fails", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(async () =>
        Promise.reject(new JSONResponse({}, { status: 500 }))
      );
    await expect(getGuildRoles(guildEnv)).rejects.toThrow(
      response.ROLE_FETCH_FAILED
    );
  });

  it("should return array of objects containing role_id and role_name", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(async () =>
        Promise.resolve(new JSONResponse(rolesMock))
      );
    const role = await getGuildRoleByName("@everyone", guildEnv);
    const expectedRoles = {
      id: "1234567889",
      name: "@everyone",
    };

    expect(role).toEqual(expectedRoles);
  });
  it("should return undefined when role name does not match any entry", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(async () =>
        Promise.resolve(new JSONResponse(rolesMock))
      );
    const role = await getGuildRoleByName("everyone", guildEnv);
    expect(role).toBeUndefined();
  });
});
describe("mentionEachUserInMessage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("should send messages to users in batches", async () => {
    const mockResponse: DiscordMessageResponse = mockMessageResponse;
    jest
      .spyOn(global, "fetch")
      .mockReturnValueOnce(Promise.resolve(new JSONResponse(mockResponse)));

    const message = "Test message";
    const userIds = ["user1", "user2", "user3"];
    const channelId = 123;
    const env = { DISCORD_TOKEN: "your_token_here" };

    await mentionEachUserInMessage({ message, userIds, channelId, env });
    expect(fetch).toHaveBeenCalledTimes(3);
  });
  it("should send a message of failed api calls at the end", async () => {
    let fetchCallCount = 0;
    jest.spyOn(global, "fetch").mockImplementation(async () => {
      if (fetchCallCount < 3) {
        fetchCallCount++;
        return Promise.resolve(new JSONResponse({ message: "404: Not Found" }));
      } else {
        return Promise.resolve(new JSONResponse({ ok: true }));
      }
    });
    const message = "Test message";
    const userIds = ["user1", "user2", "user3"];
    const channelId = 123;
    const env = { DISCORD_TOKEN: "your_token_here" };

    await mentionEachUserInMessage({ message, userIds, channelId, env });
    expect(fetch).toHaveBeenCalledTimes(4); // should send a message of failed api calls at the end
  });
});
