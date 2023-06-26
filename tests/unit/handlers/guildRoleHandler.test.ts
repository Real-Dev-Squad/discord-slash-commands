import {
  getGuildRoleByRoleNameHandler,
  getGuildRolesHandler,
} from "../../../src/controllers/guildRoleHandler";
import { GuildRole } from "../../../src/typeDefinitions/role.types";
import JSONResponse from "../../../src/utils/JsonResponse";
import { generateDummyRequestObject } from "../../fixtures/fixture";
import * as responseConstants from "../../../src/constants/responses";

jest.mock("../../../src/utils/verifyAuthToken", () => ({
  verifyAuthToken: jest.fn().mockReturnValue(true),
}));

describe.skip("get roles", () => {
  it("should return a instance of JSONResponse", async () => {
    const mockRequest = generateDummyRequestObject({ url: "/roles" });
    const response = await getGuildRolesHandler(mockRequest, {});
    expect(response).toBeInstanceOf(JSONResponse);
  });

  it("should return Bad Signature object if no auth headers provided", async () => {
    const mockRequest = generateDummyRequestObject({ url: "/roles" });
    const response: JSONResponse = await getGuildRolesHandler(mockRequest, {});
    const jsonResponse: { error: string } = await response.json();
    expect(response.status).toBe(401);
    expect(jsonResponse.error).toBe(responseConstants.BAD_SIGNATURE);
  });

  it("should return empty array if there is no roles in guild", async () => {
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      headers: { Authorization: "Bearer testtoken" },
    });

    const response: JSONResponse = await getGuildRolesHandler(mockRequest, {});
    const jsonRespose: { roles: Array<{ id: string; name: string }> } =
      await response.json();
    expect(response.status).toBe(200);
    expect(Array.isArray(jsonRespose.roles)).toBeTruthy();
    expect(jsonRespose.roles.length).toBe(0);
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
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      headers: { Authorization: "Bearer testtoken" },
    });

    const response: JSONResponse = await getGuildRolesHandler(mockRequest, {});
    const jsonRespose: { roles: Array<GuildRole> } = await response.json();
    expect(response.status).toBe(200);
    expect(Array.isArray(jsonRespose.roles)).toBeTruthy();
    expect(jsonRespose.roles).toEqual(expectedResponse);
  });
});

describe.skip("get role by role name", () => {
  it("should return a instance of JSONResponse", async () => {
    const mockRequest = generateDummyRequestObject({ url: "/roles/everyone" });
    const response = await getGuildRoleByRoleNameHandler(mockRequest, {});
    expect(response).toBeInstanceOf(JSONResponse);
  });

  it("should return Bad Signature object if no auth headers provided", async () => {
    const mockRequest = generateDummyRequestObject({ url: "/roles/everyone" });
    const response: JSONResponse = await getGuildRoleByRoleNameHandler(
      mockRequest,
      {}
    );
    const jsonResponse: { error: string } = await response.json();
    expect(response.status).toBe(401);
    expect(jsonResponse.error).toBe("🚫 Bad Request Signature");
  });

  it("should return not found object if there is no roles with given name in guild", async () => {
    const mockRequest = generateDummyRequestObject({
      url: "/roles/everyone",
      headers: { Authorization: "Bearer testtoken" },
    });

    const response: JSONResponse = await getGuildRoleByRoleNameHandler(
      mockRequest,
      {}
    );
    const jsonRespose: { error: string } = await response.json();
    expect(response.status).toBe(404);
    expect(jsonRespose.error).toBe(responseConstants.NOT_FOUND);
  });

  it("should return object of id and name corresponding to the role name recieved", async () => {
    const expectedResponse = {
      id: "role_id_one",
      name: "everyone",
    };

    const mockRequest = generateDummyRequestObject({
      url: "/roles/everyone",
      headers: { Authorization: "Bearer testtoken" },
    });

    const response: JSONResponse = await getGuildRoleByRoleNameHandler(
      mockRequest,
      {}
    );
    const jsonRespose: { roles: Array<GuildRole> } = await response.json();
    expect(response.status).toBe(200);
    expect(jsonRespose).toEqual(expectedResponse);
  });
});
