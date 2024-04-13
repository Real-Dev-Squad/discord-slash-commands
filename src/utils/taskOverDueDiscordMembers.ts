import { RDS_BASE_API_URL } from "../constants/urls";
import { UserOverdueTaskResponseType } from "../typeDefinitions/rdsUser";

export const taskOverDueDiscordMembers = async (): Promise<
  string[] | string
> => {
  try {
    const overDueUrl = `${RDS_BASE_API_URL}/users?query=filterBy:overdue_tasks`;

    const response: Response = await fetch(overDueUrl);
    const responseObj: UserOverdueTaskResponseType = await response.json();

    const discordIds: string[] = responseObj.users.map(
      (user) => user.discordId
    );

    return discordIds;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
