import { environment } from "../../fixtures/config";
import * as DiscordGroups from "../../../src/utils/fetchDiscordGroupById";
import JSONResponse from "../../../src/utils/JsonResponse";
import { groupInvite } from "../../../src/controllers/groupInvite";
import { group } from "../../fixtures/groups";
import { discordTextResponse } from "../../../src/utils/discordResponse";

describe("Test /group-invite command", () => {
  beforeEach(() => {
    jest
      .spyOn(DiscordGroups, "fetchDiscordGroupById")
      .mockImplementation(() => Promise.resolve(group));
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it("Should be an instance of JSONResponse", async () => {
    const response = await groupInvite("1", group.id, environment[0]);

    expect(response).toBeInstanceOf(JSONResponse);
  });

  it("Should return a discordTextResponse if group is not found", async () => {
    const invalidRoleId = "invalidRoleId";
    const expectedResponse = discordTextResponse(
      `<@&${invalidRoleId}> is not a valid group.`
    );

    const response = await groupInvite("1", invalidRoleId, environment[0]);

    expect(await response.json()).toEqual(await expectedResponse.json());
  });
});
