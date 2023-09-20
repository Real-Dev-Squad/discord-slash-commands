export function createTaggableDiscordIds(discordIds: string[]) {
  const formattedIds = discordIds.map((id) => `<@${id}>`);
  return formattedIds;
}
