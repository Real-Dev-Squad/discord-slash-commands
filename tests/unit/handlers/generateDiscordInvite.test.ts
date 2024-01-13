const generateDiscordLink = jest
  .fn()
  .mockReturnValue({ data: {}, message: "Invite created successfully!" });
jest.mock("../../../src/utils/generateDiscordInvite", () => ({
  generateDiscordLink,
}));
import { generateInviteLink } from "../../../src/controllers/generateDiscordInvite";
import JSONResponse from "../../../src/utils/JsonResponse";
import { generateDummyRequestObject, guildEnv } from "../../fixtures/fixture";
import * as responseConstants from "../../../src/constants/responses";
import { inviteResponseType } from "../../../src/typeDefinitions/discordLink.types";

jest.mock("../../../src/utils/verifyAuthToken", () => ({
  verifyAuthToken: jest.fn().mockReturnValue(true),
}));

describe("generate discord link", () => {
  it("should return data object with message on success ", async () => {
    const mockRequest = generateDummyRequestObject({
      method: "PUT",
      url: "/invite",
      headers: {
        Authorization: "Bearer testtoken",
        "Content-Type": "application/json",
        "X-Audit-Log-Reason": "This is a reason",
      },
      json: async () => {
        return { channelId: "xyz" };
      },
    });

    const response: JSONResponse = await generateInviteLink(
      mockRequest,
      guildEnv
    );

    await response.json();
    const body = await mockRequest.json();
    expect(generateDiscordLink).toHaveBeenLastCalledWith(
      body,
      guildEnv,
      "This is a reason"
    );
  });
  it("should return 🚫 Bad Request Signature' if authtoken is there in the header", async () => {
    const mockRequest = generateDummyRequestObject({
      url: "/invite",
    });

    const response: JSONResponse = await generateInviteLink(
      mockRequest,
      guildEnv
    );

    const jsonResponse: { error: string } = await response.json();
    expect(jsonResponse).toEqual(responseConstants.BAD_SIGNATURE);
  });

  it("should return data object with message on success", async () => {
    const mockRequest = generateDummyRequestObject({
      method: "PUT",
      url: "/invite",
      headers: {
        Authorization: "Bearer testtoken",
        "Content-Type": "application/json",
      },
      json: async () => {
        return { channelId: "xyz" };
      },
    });

    const response: JSONResponse = await generateInviteLink(
      mockRequest,
      guildEnv
    );

    const jsonResponse: inviteResponseType = await response.json();

    expect(response.status).toBe(200);
    expect(jsonResponse.message).toEqual(responseConstants.INVITED_CREATED);
  });
});
