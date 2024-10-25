import { DISCORD_BASE_URL } from "../../../src/constants/urls";
import { deleteGuildRole } from "../../../src/utils/deleteGuildRole";
import JSONResponse from "../../../src/utils/JsonResponse";
import { guildEnv } from "../../fixtures/fixture";
import * as response from "../../../src/constants/responses";

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

  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

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

  it("should return ROLE_REMOVED when response is ok", async () => {
    const mockResponse = new Response(null, {
      status: 204,
    });
    jest.spyOn(global, "fetch").mockResolvedValue(mockResponse);
    const result = await deleteGuildRole(guildEnv, roleId);
    expect(result).toEqual(response.ROLE_REMOVED);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("should return INTERNAL_SERVER_ERROR when response is not ok", async () => {
    const mockErrorResponse = new Response(response.INTERNAL_SERVER_ERROR);
    jest.spyOn(global, "fetch").mockRejectedValue(mockErrorResponse);
    const result = await deleteGuildRole(guildEnv, roleId);
    expect(result).toEqual(response.INTERNAL_SERVER_ERROR);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
