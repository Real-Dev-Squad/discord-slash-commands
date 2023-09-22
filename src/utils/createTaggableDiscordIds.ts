/**
 * Creates a taggable discord id from a list of discord ids
 * @param discordIds - List of discord ids to be formatted eg: ["123", "456", "789"]
 * @returns A list of taggable discord ids eg: ["<@123>", "<@456>", "<@789>"]
 */
export function createTaggableDiscordIds(discordIds: string[]) {
  const formattedIds = discordIds.map((id) => `<@${id}>`);
  return formattedIds;
}
