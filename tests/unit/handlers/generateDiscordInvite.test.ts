import { generateInviteLink } from "../../../src/controllers/generateDiscordInvite";
import JSONResponse from "../../../src/utils/JsonResponse";
import { generateDummyRequestObject, guildEnv } from "../../fixtures/fixture";
import * as responseConstants from "../../../src/constants/responses";

jest.mock("../../../src/utils/verifyAuthToken", () => ({
  verifyAuthToken: jest.fn().mockReturnValue(true),
}));

describe("generate discord link", () => {
  it("should return 🚫 Bad Request Signature' if authtoken is there in the header", async () => {
    const mockRequest = generateDummyRequestObject({
      url: "/invite",
      body: {
        channelId: "xyz",
      },
    });

    const response: JSONResponse = await generateInviteLink(
      mockRequest,
      guildEnv
    );

    const jsonResponse: { error: string } = await response.json();
    expect(jsonResponse).toEqual(responseConstants.BAD_SIGNATURE);
  });
});
