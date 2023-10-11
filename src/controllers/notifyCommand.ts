import {
  OVERDUE_DEFAULT_MESSAGE,
  OVERDUE_CUSTOM_MESSAGE,
  ONBOARDING_DEFAULT_MESSAGE,
  ONBOARDING_CUSTOM_MESSAGE,
} from "../constants/responses";
import {
  UserOverdueTaskResponseType,
  UserResponseType,
} from "../typeDefinitions/rdsUser";
import { discordTextResponse } from "../utils/discordResponse";
import { fetchRdsData } from "../utils/fetchRdsData";
import { createTaggableDiscordIds } from "../utils/createTaggableDiscordIds";
import { extractDiscordIds } from "../utils/extractDiscordIds";

export async function notifyCommand(
  data: Array<{ value: string }>,
  overdue?: boolean,
  onboarding?: boolean
) {
  const daysValue = data[0]?.value;

  try {
    if (overdue) {
      const options = {
        days: daysValue,
        isOverdue: true,
      };
      const usersResponse = (await fetchRdsData(
        options
      )) as UserOverdueTaskResponseType;
      const discordIDs = extractDiscordIds(usersResponse);
      const formattedIds = createTaggableDiscordIds(discordIDs);

      const message = `**Message:** ${
        Number(daysValue) > 0
          ? OVERDUE_CUSTOM_MESSAGE.replace("{{days}}", daysValue)
          : OVERDUE_DEFAULT_MESSAGE
      }`;

      const users = `**Developers:** ${formattedIds.join(", ")}`;
      const responseMessage = `${message}\n${users}`;
      return discordTextResponse(responseMessage);
    } else if (onboarding) {
      const options = {
        days: daysValue,
        isOnboarding: true,
      };
      const users = (await fetchRdsData(options)) as UserResponseType;
      const discordIDs = extractDiscordIds(users);
      const formattedIds = createTaggableDiscordIds(discordIDs);

      const message = `**Message:** ${
        Number(daysValue) > 0
          ? ONBOARDING_CUSTOM_MESSAGE.replace("{{days}}", daysValue)
          : ONBOARDING_DEFAULT_MESSAGE
      }`;

      const usersMessage = `**Developers:** ${formattedIds.join(", ")}`;
      const responseMessage = `${message}\n${usersMessage}`;
      return discordTextResponse(responseMessage);
    }
    const responseMessage = "Please provide a valid type";
    return discordTextResponse(responseMessage);
  } catch (error) {
    console.error(error);
    return discordTextResponse("Something went wrong");
  }
}
