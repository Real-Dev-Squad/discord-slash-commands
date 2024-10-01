import config from "../../config/config";
import { FAILED_TO_FETCH_DISCORD_GROUPS } from "../constants/responses";
import { env } from "../typeDefinitions/default.types";
import { GroupResponseType } from "../typeDefinitions/group.types";

async function fetchDiscordGroups(env: env): Promise<GroupResponseType> {
  try {
    const url = `${config(env).RDS_BASE_API_URL}/discord-actions/groups`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(FAILED_TO_FETCH_DISCORD_GROUPS);
    }

    const responseData: GroupResponseType = await response.json();
    return responseData;
  } catch (error) {
    console.error("An error occurred while fetching discord groups:", error);
    throw error;
  }
}

export { fetchDiscordGroups };
