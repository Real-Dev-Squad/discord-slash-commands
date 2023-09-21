import { extractDiscordIds } from "../../../src/utils/extractDiscordIds";
import { overdueTaskResponse } from "../../fixtures/user";

describe("Test extractDiscordIds function", () => {
  it("Should return an array of discord ids", () => {
    const discordIds = extractDiscordIds(overdueTaskResponse);
    expect(discordIds).toEqual([
      "123456789",
      "987654321",
      "135792468",
      "246813579",
      "369258147",
    ]);
  });

  it("Should return an empty array if no discord ids are passed", () => {
    const discordIds: any = [];
    const formattedIds = extractDiscordIds(discordIds);
    expect(formattedIds).toEqual([]);
  });

  it("Should return an empty array if no users are passed", () => {
    const discordIds: any = {};
    const formattedIds = extractDiscordIds(discordIds);
    expect(formattedIds).toEqual([]);
  });
});
