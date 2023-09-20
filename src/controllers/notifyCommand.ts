import {
  UserOverdueTask,
  UserOverdueTaskResponseType,
  UserResponseType,
  UserType,
} from "../typeDefinitions/rdsUser";
import { discordTextResponse } from "../utils/discordResponse";
import { fetchRdsData } from "../utils/fetchRdsData";

function convertIdsToFormatted(discordIds: string[]) {
  if (!Array.isArray(discordIds)) {
    throw new Error("Input should be an array of IDs");
  }

  const formattedIds = discordIds.map((id) => `<@${id}>`);
  return formattedIds;
}

function getDiscordIds(
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

export async function notifyCommand(
  data: Array<{ name: string; value: string }>
) {
  const typeValue = data[0].value;
  const daysValue = data[1]?.value;

  try {
    if (typeValue === "OVERDUE") {
      const options = {
        isOverdue: true,
        days: daysValue,
      };
      const usersResponse = (await fetchRdsData(
        options
      )) as UserOverdueTaskResponseType;
      const discordIDs = getDiscordIds(usersResponse);

      const formattedIds = convertIdsToFormatted(discordIDs);

      const message = `**Message:** ${
        daysValue
          ? `Please be aware that you currently have tasks that are overdue or due within the next ${daysValue} day. If you require additional time to complete these tasks, kindly submit an extension request.`
          : "You have overdue tasks."
      }`;

      const users = `**Developers:** ${formattedIds.join(", ")}`;
      const responseMessage = `${message}\n${users}`;
      return discordTextResponse(responseMessage);
    } else if (typeValue === "ONBOARDING") {
      const options = {
        isOnboarding: true,
        days: daysValue,
      };
      const users = (await fetchRdsData(options)) as UserResponseType;
      const discordIDs = getDiscordIds(users);

      const formattedIds = convertIdsToFormatted(discordIDs);

      const message = `**Message:** ${
        daysValue
          ? `Please update your status explaining why you are unable to complete your onboarding tasks within ${daysValue} days.`
          : `You currently have an onboarding status. Please provide an update explaining any challenges you're facing in completing your tasks. If you're finished, consider assigning new tasks to Admin.`
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
