import JSONResponse from "../../src/utils/JsonResponse";
import { discordephemeralResponse } from "../../src/utils/discordEphemeralResponse.ts";

describe("Test discordResponse function", () => {
  const DISCORD_TOKEN = "DUMMY TOKEN";
  it("should return a JSONResponse", () => {
    const response = discordephemeralResponse(
      "Dummy token message",
      DISCORD_TOKEN
    );
    expect(response).toBeInstanceOf(Promise<JSONResponse>);
  });
  it("Should have response status 200", async () => {
    const response = await discordephemeralResponse(
      "Dummy token message",
      DISCORD_TOKEN
    );
    expect(response?.status).toBe(200);
  });
  it("Should have status text defined", async () => {
    const response = await discordephemeralResponse(
      "Dummy token message",
      DISCORD_TOKEN
    );
    expect(response?.statusText).toBeDefined;
  });
});
