import { fetchUserDetailsByDiscordId } from "../utils/fetchUserDetailsByDiscordId";
import { formatUserDetails } from "../utils/formatUserDetails";
import { rdsUserDetails } from "../typeDefinitions/discordMessage.types";

export async function fetchAndFormatUserDetails(userId: string) {
  const userDetails: rdsUserDetails = (await fetchUserDetailsByDiscordId(
    userId
  )) as rdsUserDetails;
  const user = `${JSON.stringify(userDetails)}`;
  return formatUserDetails(user);
}
