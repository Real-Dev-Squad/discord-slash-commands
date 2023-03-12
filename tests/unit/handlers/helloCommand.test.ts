import { InteractionResponseType } from "discord-interactions";
import { helloCommand } from "../../../src/controllers/helloCommand";
import { responseJson } from "../../../src/typeDefinitions/default.types";
import JSONResponse from "../../../src/utils/JsonResponse";

describe("Test helloCommand function", () => {
  it("Should be an instance of JSONResponse", () => {
    const response = helloCommand(1234);
    expect(response).toBeInstanceOf(JSONResponse);
  });
  it("Should have type as channelMessageWithSource", async () => {
    const response: responseJson = await helloCommand(1234).json();
    expect(response?.type).toBe(
      InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE
    );
  });
  it("Should have content as 'Hello <@userId>'", async () => {
    const response: responseJson = await helloCommand(1234).json();
    expect(response.data.content).toBe("Hello <@1234>");
  });
});
