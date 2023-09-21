import { generateInviteLink } from "../../../src/controllers/generateDiscordInvite";
import JSONResponse from "../../../src/utils/JsonResponse";
import { generateDummyRequestObject, guildEnv } from "../../fixtures/fixture";
import * as responseConstants from "../../../src/constants/responses";
import { inviteResponseType } from "../../../src/typeDefinitions/discordLink.types";

jest.mock("../../../src/utils/verifyAuthToken", () => ({
  verifyAuthToken: jest.fn().mockReturnValue(true),
}));

jest.mock("../../../src/utils/generateDiscordInvite", () => ({
  generateDiscordLink: jest
    .fn()
    .mockReturnValue({ data: {}, message: "Invite created successfully!" }),
}));

describe("generate discord link", () => {
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
