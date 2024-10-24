import {
  deleteGuildRoleHandler,
  getGuildRoleByRoleNameHandler,
  getGuildRolesHandler,
  getGuildRolesPostHandler,
} from "../../../src/controllers/guildRoleHandler";
import { Role } from "../../../src/typeDefinitions/role.types";
import JSONResponse from "../../../src/utils/JsonResponse";
import {
  generateDummyRequestObject,
  guildEnv,
  memberGroupRoleList,
  memberGroupRoleResponseList,
  rolesMock,
} from "../../fixtures/fixture";
import * as responseConstants from "../../../src/constants/responses";
import * as guildRoleUtils from "../../../src/utils/guildRole";
import { GROUP_ROLE_ADD } from "../../../src/constants/requestsActions";

jest.mock("../../../src/utils/verifyAuthToken", () => ({
  verifyNodejsBackendAuthToken: jest.fn().mockReturnValue(true),
  verifyCronJobsToken: jest.fn().mockReturnValue(true),
}));

const getGuildRolesSpy = jest.spyOn(guildRoleUtils, "getGuildRoles");
const getGuildRoleByNameSpy = jest.spyOn(guildRoleUtils, "getGuildRoleByName");

describe("get roles", () => {
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
      message: responseConstants.ROLE_FETCH_FAILED,
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
    expect(jsonResponse).toEqual({
      error: responseConstants.ROLE_FETCH_FAILED,
    });
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
    expect(jsonResponse).toEqual({
      error: responseConstants.INTERNAL_SERVER_ERROR,
    });
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
    const jsonResponse: { roles: Array<Role> } = await response.json();
    expect(response.status).toBe(200);
    expect(Array.isArray(jsonResponse.roles)).toBeTruthy();
    expect(jsonResponse.roles.length).toBe(0);
  });

  it("should return array of id and name of roles present in guild", async () => {
    getGuildRolesSpy.mockResolvedValueOnce(rolesMock);
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      headers: { Authorization: "Bearer testtoken" },
    });

    const response: JSONResponse = await getGuildRolesHandler(
      mockRequest,
      guildEnv
    );
    const jsonResponse: { roles: Array<Role> } = await response.json();
    expect(response.status).toBe(200);
    expect(Array.isArray(jsonResponse.roles)).toBeTruthy();
    expect(jsonResponse.roles).toEqual(rolesMock);
  });
});

describe("get role by role name", () => {
  afterEach(() => {
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

  it("should return BAD REQUEST error if roleName is not provided", async () => {
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
    expect(jsonResponse).toEqual(responseConstants.BAD_REQUEST);
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
      message: responseConstants.ROLE_FETCH_FAILED,
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
    const role: Role = await response.json();
    expect(response.status).toBe(500);
    expect(role).toEqual({
      error: responseConstants.ROLE_FETCH_FAILED,
    });
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
    const role: Role = await response.json();
    expect(response.status).toBe(500);
    expect(role).toEqual({
      error: responseConstants.INTERNAL_SERVER_ERROR,
    });
  });

  it("should return object of id and name corresponding to the role name recieved", async () => {
    const resultMock = { id: rolesMock[0].id, name: rolesMock[0].name };
    getGuildRoleByNameSpy.mockResolvedValueOnce(resultMock);

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
    const role: Role = await response.json();
    expect(response.status).toBe(200);
    expect(role).toEqual(resultMock);
  });
});

describe("getGuildRolesPostHandler", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(
      () =>
        new Promise((resolve) => {
          return resolve(new JSONResponse({}, { status: 200 }));
        })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it("should return response with user id and status for bulk add group roles", async () => {
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      method: "POST",
      headers: { Authorization: "Bearer testtoken" },
      json: () => Promise.resolve(memberGroupRoleList),
      query: { action: GROUP_ROLE_ADD.ADD_ROLE },
    });
    const response = await getGuildRolesPostHandler(mockRequest, guildEnv);
    expect(response).toBeInstanceOf(JSONResponse);
    const responseBody = await response.json();
    expect(responseBody).toEqual(memberGroupRoleResponseList);
  });

  it("should return Bad Signature object if no auth headers provided", async () => {
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      method: "POST",
      json: () => Promise.resolve(memberGroupRoleList),
      query: { action: GROUP_ROLE_ADD.ADD_ROLE },
    });
    const response: JSONResponse = await getGuildRolesPostHandler(
      mockRequest,
      guildEnv
    );
    const jsonResponse: { error: string } = await response.json();
    expect(jsonResponse).toEqual(responseConstants.BAD_SIGNATURE);
  });

  it("should return Bad Signature object if invalid action is provided", async () => {
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      method: "POST",
      headers: { Authorization: "Bearer testtoken" },
      json: () => Promise.resolve(memberGroupRoleList),
      query: { action: "INVALID_ACTION" },
    });
    const response: JSONResponse = await getGuildRolesPostHandler(
      mockRequest,
      guildEnv
    );
    const jsonResponse: { error: string } = await response.json();
    expect(jsonResponse).toEqual(responseConstants.BAD_SIGNATURE);
  });

  it("should return Bad Signature if request body length is above 25", async () => {
    const requestList = new Array(26).fill(memberGroupRoleList[0]);
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      method: "POST",
      headers: { Authorization: "Bearer testtoken" },
      json: () => Promise.resolve(requestList),
      query: { action: GROUP_ROLE_ADD.ADD_ROLE },
    });
    const response: JSONResponse = await getGuildRolesPostHandler(
      mockRequest,
      guildEnv
    );
    const jsonResponse: { error: string } = await response.json();
    expect(jsonResponse).toEqual(responseConstants.BAD_SIGNATURE);
    expect(response.statusText).toBe("Max requests length is 25");
  });

  it("should return internal server error when theres an error", async () => {
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      method: "POST",
      headers: { Authorization: "Bearer testtoken" },
      json: [],
      query: { action: GROUP_ROLE_ADD.ADD_ROLE },
    });
    const response: JSONResponse = await getGuildRolesPostHandler(
      mockRequest,
      guildEnv
    );
    const jsonResponse: { error: string } = await response.json();
    expect(jsonResponse).toEqual(responseConstants.INTERNAL_SERVER_ERROR);
  });
});

describe("deleteGuildRoleHandler", () => {
  it("should return undefined", async () => {
    const mockRequest = generateDummyRequestObject({
      url: "/guildroles",
      params: {
        roleId: "101",
      },
      method: "DELETE",
    });
    const response = await deleteGuildRoleHandler(mockRequest, guildEnv);
    expect(response).toEqual(undefined);
  });
});
