import { InteractionResponseType } from "discord-interactions";
import { responseJson } from "../../../src/typeDefinitions/default.types";
import { discordTextResponse } from "../../../src/utils/discordResponse";
import JSONResponse from "../../../src/utils/JsonResponse";

describe("Test discordResponse function", () => {
  it("should return a JSONResponse", () => {
    const response = discordTextResponse("Hello");
    expect(response).toBeInstanceOf(JSONResponse);
  });
  it("Should have type as channelMessageWithSource", async () => {
    const response: responseJson = await discordTextResponse("Hello").json();
    expect(response?.type).toBe(
      InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE
    );
  });
  it("Should contain a content property in data", async () => {
    const response: responseJson = await discordTextResponse("Hello").json();
    expect(response?.data).toHaveProperty("content");
  });
  it("Should have content as hello", async () => {
    const response: responseJson = await discordTextResponse("Hello").json();
    expect(response?.data.content).toBe("Hello");
  });
});
