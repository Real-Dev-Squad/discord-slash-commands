import {
  grantAWSAccess,
  processAWSAccessRequest,
} from "../../../src/utils/awsAccess";
import { discordTextResponse } from "../../../src/utils/discordResponse";
import jwt from "@tsndr/cloudflare-worker-jwt";

jest.mock("node-fetch");
jest.mock("@tsndr/cloudflare-worker-jwt");
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
const ctx = {
  waitUntil: jest.fn(),
  passThroughOnException: jest.fn(),
  props: {},
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
      `<@${discordUserId}> Processing your request to grant AWS access.`
    );

    // Ensure the function returns the mocked response
    expect(response).toEqual(mockResponse);
    expect(ctx.waitUntil).toHaveBeenCalled(); // Ensure waitUntil is called
  });

  it("should handle succesful API call and grant access", async () => {
    const fetchCalls: string[] = [];
    fetchSpy.mockImplementation((url, options) => {
      fetchCalls.push(`Fetch call to: ${url}`);
      if (url.includes("/aws/groups/access")) {
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
      channelId
    );

    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(fetchCalls).toHaveLength(2);

    expect(fetchCalls[0]).toContain("/aws/groups/access");
    expect(fetchCalls[1]).toContain("/channels/123456789/messages");
  });

  it("should handle API error", async () => {
    const fetchCalls: string[] = [];
    fetchSpy.mockImplementation((url, options) => {
      fetchCalls.push(`Fetch call to: ${url}`);
      if (url.includes("/aws/groups/access")) {
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
      channelId
    );

    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(fetchCalls).toHaveLength(2);

    expect(fetchCalls[0]).toContain("/aws/groups/access");
    expect(fetchCalls[1]).toContain("/channels/123456789/messages");
  });
});
