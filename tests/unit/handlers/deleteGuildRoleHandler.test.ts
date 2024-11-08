import { generateDummyRequestObject, guildEnv } from "../../fixtures/fixture";
import * as responseConstants from "../../../src/constants/responses";
import * as verifyTokenUtils from "../../../src/utils/verifyAuthToken";
import { deleteGuildRoleHandler } from "../../../src/controllers/deleteGuildRoleHandler";
import * as deleteGuildRoleUtils from "../../../src/utils/deleteGuildRole";

describe("deleteGuildRoleHandler", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const roleId = "1A32BEX04";
  it("should return NOT_FOUND when dev is false", async () => {
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      params: {
        roleId: roleId,
      },
      query: {
        dev: "false",
      },
      method: "DELETE",
    });
    const response = await deleteGuildRoleHandler(mockRequest, guildEnv);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual(responseConstants.NOT_FOUND);
  });
  it("should return BAD_REQUEST when roleId is not valid", async () => {
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      params: {
        roleId: "",
      },
      query: {
        dev: "true",
      },
      method: "DELETE",
      headers: { Authorization: "Bearer testtoken" },
    });
    const response = await deleteGuildRoleHandler(mockRequest, guildEnv);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual(responseConstants.BAD_REQUEST);
  });
  it("should return BAD_SIGNATURE when authorization header is not provided", async () => {
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      params: {
        roleId: roleId,
      },
      query: {
        dev: "true",
      },
      method: "DELETE",
    });
    const response = await deleteGuildRoleHandler(mockRequest, guildEnv);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual(responseConstants.BAD_SIGNATURE);
  });
  it("should return INTERNAL_SERVER_ERROR when response is not ok", async () => {
    const mockResponse = responseConstants.INTERNAL_SERVER_ERROR;
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      params: {
        roleId: roleId,
      },
      query: {
        dev: "true",
      },
      method: "DELETE",
      headers: { Authorization: "Bearer testtoken" },
    });
    jest
      .spyOn(deleteGuildRoleUtils, "deleteGuildRole")
      .mockResolvedValue(mockResponse);
    const response = await deleteGuildRoleHandler(mockRequest, guildEnv);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual(mockResponse);
  });
  it("should return INTERNAL_SERVER_ERROR when token is not verified", async () => {
    const mockResponse = responseConstants.INTERNAL_SERVER_ERROR;
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      method: "DELETE",
      params: {
        roleId: roleId,
      },
      query: {
        dev: "true",
      },
      headers: { Authorization: "Bearer testtoken" },
    });
    jest
      .spyOn(verifyTokenUtils, "verifyNodejsBackendAuthToken")
      .mockRejectedValue(mockResponse);
    const response = await deleteGuildRoleHandler(mockRequest, guildEnv);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual(mockResponse);
  });
  it("should return ok response", async () => {
    const mockResponse = new Response(null, {
      status: 204,
    });
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      method: "DELETE",
      params: {
        roleId: roleId,
      },
      query: {
        dev: "true",
      },
      headers: { Authorization: "Bearer testtoken" },
    });
    const verifyTokenSpy = jest
      .spyOn(verifyTokenUtils, "verifyNodejsBackendAuthToken")
      .mockResolvedValueOnce();
    const deleteGuildRoleSpy = jest
      .spyOn(deleteGuildRoleUtils, "deleteGuildRole")
      .mockResolvedValueOnce(responseConstants.ROLE_REMOVED);
    const response = await deleteGuildRoleHandler(mockRequest, guildEnv);
    expect(verifyTokenSpy).toHaveBeenCalledTimes(1);
    expect(deleteGuildRoleSpy).toHaveBeenCalledTimes(1);
    expect(response).toEqual(mockResponse);
    expect(response.status).toEqual(mockResponse.status);
  });
});
