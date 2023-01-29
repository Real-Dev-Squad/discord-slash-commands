import { verifyBot } from "../../src/utils/verifyBot";

describe("test verifyBot function", () => {
  it("should return false for invalid request", async () => {
    const request = new Request("https://test.com");
    const response = await verifyBot(request, {});
    expect(response).toBe(false);
  });
});
