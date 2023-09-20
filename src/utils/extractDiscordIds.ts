import {
  UserOverdueTaskResponseType,
  UserResponseType,
  UserOverdueTask,
  UserType,
} from "../typeDefinitions/rdsUser";

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
