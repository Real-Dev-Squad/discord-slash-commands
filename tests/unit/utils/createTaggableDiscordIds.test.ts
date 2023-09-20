import { createTaggableDiscordIds } from "../../../src/utils/createTaggableDiscordIds";

describe("Test createTaggableDiscordIds function", () => {
  it("Should return an array of taggable discord ids", () => {
    const discordIds = ["123", "456", "789"];
    const formattedIds = createTaggableDiscordIds(discordIds);
    expect(formattedIds).toEqual(["<@123>", "<@456>", "<@789>"]);
  });
  it("Should return an empty array if no discord ids are passed", () => {
    const discordIds: any = [];
    const formattedIds = createTaggableDiscordIds(discordIds);
    expect(formattedIds).toEqual([]);
  });
});
