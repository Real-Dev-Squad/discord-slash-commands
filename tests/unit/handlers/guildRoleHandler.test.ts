import {
  getGuildRoleByRoleNameHandler,
  getGuildRolesHandler,
} from "../../../src/controllers/guildRoleHandler";
import { GuildRole } from "../../../src/typeDefinitions/role.types";
import JSONResponse from "../../../src/utils/JsonResponse";
import { generateDummyRequestObject, guildEnv } from "../../fixtures/fixture";
import * as responseConstants from "../../../src/constants/responses";
import * as guildRoleUtils from "../../../src/utils/guildRole";

jest.mock("../../../src/utils/verifyAuthToken", () => ({
  verifyAuthToken: jest.fn().mockReturnValue(true),
}));

const getGuildRolesSpy = jest.spyOn(guildRoleUtils, "getGuildRoles");
const getGuildRoleByNameSpy = jest.spyOn(guildRoleUtils, "getGuildRoleByName");

describe("get roles", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return a instance of JSONResponse", async () => {
    const mockRequest = generateDummyRequestObject({ url: "/roles" });
    const response = await getGuildRolesHandler(mockRequest, guildEnv);
    expect(response).toBeInstanceOf(JSONResponse);
  });

  it("should return Bad Signature object if no auth headers provided", async () => {
    const mockRequest = generateDummyRequestObject({ url: "/roles" });
    const response: JSONResponse = await getGuildRolesHandler(
      mockRequest,
      guildEnv
    );
    const jsonResponse: { error: string } = await response.json();
    expect(response.status).toBe(401);
    expect(jsonResponse).toEqual(responseConstants.BAD_SIGNATURE);
  });

  it("should return role fetch failed error response if it fails to fetch roles", async () => {
    getGuildRolesSpy.mockRejectedValueOnce({
      message: responseConstants.ROLE_FETCH_FAILED_MESSAGE,
    });
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      headers: { Authorization: "Bearer testtoken" },
    });
    const response: JSONResponse = await getGuildRolesHandler(
      mockRequest,
      guildEnv
    );
    const jsonResponse = await response.json();
    expect(response.status).toBe(500);
    expect(jsonResponse).toEqual(responseConstants.ROLE_FETCH_FAILED_ERROR);
  });

  it("should return internal server error response if it fails for any other reason", async () => {
    getGuildRolesSpy.mockRejectedValueOnce({});
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      headers: { Authorization: "Bearer testtoken" },
    });
    const response: JSONResponse = await getGuildRolesHandler(
      mockRequest,
      guildEnv
    );
    const jsonResponse = await response.json();
    expect(response.status).toBe(500);
    expect(jsonResponse).toBe(responseConstants.INTERNAL_SERVER_ERROR);
  });

  it("should return empty array if there is no roles in guild", async () => {
    getGuildRolesSpy.mockResolvedValue([]);
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      headers: { Authorization: "Bearer testtoken" },
    });

    const response: JSONResponse = await getGuildRolesHandler(
      mockRequest,
      guildEnv
    );
    const jsonResponse: { roles: Array<{ id: string; name: string }> } =
      await response.json();
    expect(response.status).toBe(200);
    expect(Array.isArray(jsonResponse.roles)).toBeTruthy();
    expect(jsonResponse.roles.length).toBe(0);
  });

  it("should return array of id and name of roles present in guild", async () => {
    const expectedResponse = [
      {
        id: "role_id_one",
        name: "role_name_one",
      },
      {
        id: "role_id_two",
        name: "role_name_two",
      },
    ];
    getGuildRolesSpy.mockResolvedValueOnce(expectedResponse);

    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      headers: { Authorization: "Bearer testtoken" },
    });

    const response: JSONResponse = await getGuildRolesHandler(
      mockRequest,
      guildEnv
    );
    const jsonResponse: { roles: Array<GuildRole> } = await response.json();
    expect(response.status).toBe(200);
    expect(Array.isArray(jsonResponse.roles)).toBeTruthy();
    expect(jsonResponse.roles).toEqual(expectedResponse);
  });
});

describe("get role by role name", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return a instance of JSONResponse", async () => {
    getGuildRoleByNameSpy.mockResolvedValueOnce(undefined);
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      params: {
        roleName: "everyone",
      },
      headers: { Authorization: "Bearer testtoken" },
    });
    const response = await getGuildRoleByRoleNameHandler(mockRequest, guildEnv);
    expect(response).toBeInstanceOf(JSONResponse);
  });

  it("should return Bad Signature object if no auth headers provided", async () => {
    getGuildRoleByNameSpy.mockResolvedValueOnce(undefined);
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      params: {
        roleName: "everyone",
      },
    });
    const response: JSONResponse = await getGuildRoleByRoleNameHandler(
      mockRequest,
      guildEnv
    );
    const jsonResponse: { error: string } = await response.json();
    expect(response.status).toBe(401);
    expect(jsonResponse).toEqual(responseConstants.BAD_SIGNATURE);
  });

  it("should return Not Found error if no roleName is not provided", async () => {
    getGuildRoleByNameSpy.mockResolvedValueOnce(undefined);
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      params: {},

      headers: { Authorization: "Bearer testtoken" },
    });
    const response: JSONResponse = await getGuildRoleByRoleNameHandler(
      mockRequest,
      guildEnv
    );
    const jsonResponse: { error: string } = await response.json();
    expect(response.status).toBe(404);
    expect(jsonResponse).toEqual(responseConstants.NOT_FOUND);
  });

  it("should return not found object if there is no roles with given name in guild", async () => {
    getGuildRoleByNameSpy.mockResolvedValueOnce(undefined);

    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      params: {
        roleName: "everyone",
      },
      headers: { Authorization: "Bearer testtoken" },
    });

    const response: JSONResponse = await getGuildRoleByRoleNameHandler(
      mockRequest,
      guildEnv
    );
    const jsonResponse: { error: string } = await response.json();
    expect(response.status).toBe(404);
    expect(jsonResponse).toEqual(responseConstants.NOT_FOUND);
  });

  it("should return role fetch failed error if there was an error while fetching roles", async () => {
    getGuildRoleByNameSpy.mockRejectedValueOnce({
      message: responseConstants.ROLE_FETCH_FAILED_MESSAGE,
    });

    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      params: {
        roleName: "everyone",
      },
      headers: { Authorization: "Bearer testtoken" },
    });

    const response: JSONResponse = await getGuildRoleByRoleNameHandler(
      mockRequest,
      guildEnv
    );
    const jsonResponse: { roles: Array<GuildRole> } = await response.json();
    expect(response.status).toBe(500);
    expect(jsonResponse).toEqual(responseConstants.ROLE_FETCH_FAILED_ERROR);
  });

  it("should return internal server error if there was any other error", async () => {
    getGuildRoleByNameSpy.mockRejectedValueOnce({});

    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      params: {
        roleName: "everyone",
      },
      headers: { Authorization: "Bearer testtoken" },
    });

    const response: JSONResponse = await getGuildRoleByRoleNameHandler(
      mockRequest,
      guildEnv
    );
    const jsonResponse: { roles: Array<GuildRole> } = await response.json();
    expect(response.status).toBe(500);
    expect(jsonResponse).toBe(responseConstants.INTERNAL_SERVER_ERROR);
  });

  it("should return object of id and name corresponding to the role name recieved", async () => {
    const expectedResponse = {
      id: "role_id_one",
      name: "everyone",
    };

    getGuildRoleByNameSpy.mockResolvedValueOnce(expectedResponse);

    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      params: {
        roleName: "everyone",
      },
      headers: { Authorization: "Bearer testtoken" },
    });

    const response: JSONResponse = await getGuildRoleByRoleNameHandler(
      mockRequest,
      guildEnv
    );
    const jsonResponse: { roles: Array<GuildRole> } = await response.json();
    expect(response.status).toBe(200);
    expect(jsonResponse).toEqual(expectedResponse);
  });
});
