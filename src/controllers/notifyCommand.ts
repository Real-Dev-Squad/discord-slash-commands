import { UserOverdueTaskResponseType } from "../typeDefinitions/rdsUser";
import { discordTextResponse } from "../utils/discordResponse";
import { fetchRdsData } from "../utils/fetchRdsData";

function convertIdsToFormatted(discordIds: string[]) {
  if (!Array.isArray(discordIds)) {
    throw new Error("Input should be an array of IDs");
  }

  const formattedIds = discordIds.map((id) => `<@${id}>`);
  return formattedIds;
}

export async function notifyCommand(
  data: Array<{ name: string; value: string }>
) {
  const typeValue = data[0].value;
  const daysValue = data[1].value;

  try {
    if (typeValue === "OVERDUE") {
      const options = {
        isOverdue: true,
        days: daysValue,
      };
      const usersResponse = (await fetchRdsData(
        options
      )) as UserOverdueTaskResponseType;
      const userData = usersResponse?.users;
      const discordIDs: string[] = [];
      userData?.forEach((user) => {
        const discordId = user?.discordId;
        if (discordId) {
          discordIDs.push(discordId);
        }
      });

      const formattedIds = convertIdsToFormatted(discordIDs);

      const responseMessage = `
        Type: ${typeValue}
        Days: ${daysValue}
        Users: ${formattedIds?.join(", ")}
      `;
      return discordTextResponse(responseMessage);
    } else if (typeValue === "ONBOARDING") {
      const options = {
        isOnboarding: true,
        days: daysValue,
      };
      const users = await fetchRdsData(options);
      console.log(users);
    }

    const responseMessage = `
      Type: ${typeValue}
      Days: ${daysValue}
    `;

    return discordTextResponse(responseMessage);
  } catch (error) {
    console.error(error);
    return discordTextResponse("Something went wrong");
  }
}
