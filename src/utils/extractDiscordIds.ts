import {
  UserOverdueTaskResponseType,
  UserResponseType,
  UserOverdueTask,
  UserType,
} from "../typeDefinitions/rdsUser";

/**
 * Extracts discord IDs from a UserResponseType or UserOverdueTaskResponseType which fetches data from the RDS API
 * @param usersResponse - A UserResponseType or UserOverdueTaskResponseType
 * @returns A list of discord IDs eg: ["123", "456", "789"]
 */

export function extractDiscordIds(
  usersResponse: UserOverdueTaskResponseType | UserResponseType
): string[] {
  const userData = usersResponse?.users;
  const discordIDs: string[] = [];
  userData?.forEach((user: UserOverdueTask | UserType) => {
    const discordId = user?.discordId;
    if (discordId) {
      discordIDs.push(discordId);
    }
  });
  return discordIDs;
}
