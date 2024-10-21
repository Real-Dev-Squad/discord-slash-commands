import {
  grantAWSAccess,
  processAWSAccessRequest,
} from "../../../src/utils/awsAccess";
import { discordTextResponse } from "../../../src/utils/discordResponse";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { AWS_IAM_SIGNIN_URL } from "../../../src/constants/urls";

jest.mock("node-fetch");
jest.mock("@tsndr/cloudflare-worker-jwt");
jest.mock("uuid", () => ({
  v4: jest.fn(() => "123e4567-e89b-12d3-a456-426614174000"),
}));
jest.mock("../../../src/utils/discordResponse", () => ({
  discordTextResponse: jest.fn(),
}));

const discordUserId = "test-user";
const awsGroupId = "test-group";
const env = {
  BOT_PRIVATE_KEY: "mock-bot-private-key",
  DISCORD_TOKEN: "mock-discord-token",
  RDS_BASE_API_URL: "https://mock-api-url.com",
};
const channelId = 123456789;
const traceId = "123424";
const ctx = {
  waitUntil: jest.fn(),
  passThroughOnException: jest.fn(),
};
let fetchSpy: jest.SpyInstance;

beforeEach(() => {
  fetchSpy = jest.spyOn(global, "fetch");
  jest.spyOn(jwt, "sign").mockResolvedValue("mockJwtToken");
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("ProcessAWSAccessRequest", () => {
  it("Should be a JSON response", async () => {
    const mockResponse = { content: "Processing your request..." };
    (discordTextResponse as jest.Mock).mockReturnValue(mockResponse);
    const response = await grantAWSAccess(
      discordUserId,
      awsGroupId,
      env,
      ctx,
      channelId
    );
    expect(discordTextResponse).toHaveBeenCalledWith(
      `[TraceId: 123e4567-e89b-12d3-a456-426614174000] <@${discordUserId}> Processing your request to grant AWS access.`
    );

    // Ensure the function returns the mocked response
    expect(response).toEqual(mockResponse);
    expect(ctx.waitUntil).toHaveBeenCalled(); // Ensure waitUntil is called
  });

  it("should handle succesful API call and grant access", async () => {
    const fetchCalls: string[] = [];
    fetchSpy.mockImplementation((url, options) => {
      fetchCalls.push(`Fetch call to: ${url}`);
      if (url.includes("/aws-access")) {
        return Promise.resolve({ ok: true } as Response);
      } else if (url.includes("/channels/123456789/messages")) {
        return Promise.resolve({ ok: true } as Response);
      }
      return Promise.reject(new Error("Unexpected URL"));
    });

    await processAWSAccessRequest(
      discordUserId,
      awsGroupId,
      env as any,
      traceId,
      channelId
    );

    console.log("Fetch calls made:", fetchCalls);

    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(fetchCalls).toHaveLength(2);

    expect(fetchCalls[0]).toContain("/aws-access");
    expect(fetchCalls[1]).toContain("/channels/123456789/messages");
    // The last call should be the error message
    expect(fetchSpy).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining("/aws-access"),
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "Bearer mockJwtToken",
        }),
        body: JSON.stringify({
          groupId: awsGroupId,
          userId: discordUserId,
        }),
      })
    );

    expect(fetchSpy).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining("/channels/123456789/messages"),
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "Bot mock-discord-token",
        }),
        body: JSON.stringify({
          content: `AWS access granted successfully <@${discordUserId}>! Please head over to AWS - ${AWS_IAM_SIGNIN_URL}.`,
        }),
      })
    );
  });

  it("should handle API error", async () => {
    const fetchCalls: string[] = [];
    fetchSpy.mockImplementation((url, options) => {
      fetchCalls.push(`Fetch call to: ${url}`);
      if (url.includes("/aws-access")) {
        return Promise.resolve({
          ok: false,
          status: 500,
          statusText: "Internal Server Error",
        } as Response);
      } else if (url.includes(`/channels/123456789/messages`)) {
        return Promise.resolve({ ok: true } as Response);
      }
      return Promise.reject(new Error("Unexpected URL"));
    });

    await processAWSAccessRequest(
      discordUserId,
      awsGroupId,
      env as any,
      traceId,
      channelId
    );

    console.log("Fetch calls made:", fetchCalls);

    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(fetchCalls).toHaveLength(2);

    expect(fetchCalls[0]).toContain("/aws-access");
    expect(fetchCalls[1]).toContain("/channels/123456789/messages");

    expect(fetchSpy).toHaveBeenLastCalledWith(
      expect.stringContaining("/channels/123456789/messages"),
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "Bot mock-discord-token",
        }),
        body: JSON.stringify({
          content: `<@${discordUserId}> Error occurred while granting AWS access: 500 Internal Server Error`,
        }),
      })
    );
  });
});
