import { env } from "../typeDefinitions/default.types";
import {
  UserResponseType,
  userListResponseType,
} from "../typeDefinitions/rdsUser.types";
import { discordTextResponse } from "../utils/discordResponse";
import { fetchRdsData } from "../utils/fetchUser";

function convertIdsToFormatted(discordIds: string[]) {
  if (!Array.isArray(discordIds)) {
    throw new Error("Input should be an array of IDs");
  }

  const formattedIds = discordIds.map((id) => `<@${id}>`);
  return formattedIds;
}


export async function notifyCommand(data: any) {
  const typeValue = data[0].value;
  const daysValue = data[1].value;

  try {
    if (typeValue === "OVERDUE") {
      const options = {
        isOverdue: true,
        days: daysValue,
      };
      const usersResponse: any = await fetchRdsData(options);
      const usersIds = usersResponse?.users;
      const discordIDs = [] || undefined;
      for (let i = 0; i < 10; i++) {
        const discordId = await fetchRdsData({ userId: usersIds[i] });
        if (discordId?.user.discordId) {
          discordIDs.push(discordId?.user.discordId);
        }
      }

      // users?.forEach(async (id: string) => {
      //   const discordId = await fetchRdsData({ userId: id });
      //   console.log("discordId", discordId);
      //   if (discordId?.user.discordId)
      //   discordIDs.push(discordId?.user.discordId);
      // });
      const formattedIds = convertIdsToFormatted(discordIDs);
      // return discordTextResponse(
      //   `Overdue tasks for ${daysValue} days: ${discordIDs?.join(", ")}`
      // );
      // tag users here in the message in discord using discordIDs
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
  } catch (error: any) {
    console.error(error.message);
    return discordTextResponse("Something went wrong");
  }
}
