import { InteractionResponseType } from "discord-interactions";
import { responseJson } from "../../src/typeDefinitions/default.types";
import JSONResponse from "../../src/utils/JsonResponse";
import { discordEphemeralResponse } from "../../src/utils/discordEphemeralResponse";

describe("Test discordEphemeralResponse function", () => {
  it("should return a JSONResponse", () => {
    const response = discordEphemeralResponse("Hello");
    expect(response).toBeInstanceOf(JSONResponse);
  });
  it("Should have type as channelMessageWithSource", async () => {
    const response: responseJson = await discordEphemeralResponse(
      "Hello"
    ).json();
    expect(response?.type).toBe(
      InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE
    );
  });
  it("Should contain a content property in data", async () => {
    const response: responseJson = await discordEphemeralResponse(
      "Hello"
    ).json();
    expect(response?.data).toHaveProperty("content");
  });
  it("Should have content as hello", async () => {
    const response: responseJson = await discordEphemeralResponse(
      "Hello"
    ).json();
    expect(response?.data.content).toBe("Hello");
  });
  it("Should contain a flag property in data", async () => {
    const response: responseJson = await discordEphemeralResponse(
      "Hello"
    ).json();
    expect(response?.data).toHaveProperty("flags");
  });
  it("Should have flag as 64", async () => {
    const response: responseJson = await discordEphemeralResponse(
      "Hello"
    ).json();
    expect(response?.data.flags).toBe(64);
  });
});
