import { RDS_BASE_STAGING_API_URL } from "../constants/urls";
import { getDiscordIds } from "./getDiscordIds";
import { UserBackend } from "../typeDefinitions/userBackend.types";

export const taskOverDueDiscordMembers = async () => {
  try {
    const overDueUrl = `${RDS_BASE_STAGING_API_URL}/tasks?dev=true&status=overdue&size=100`;

    const response = await fetch(overDueUrl);
    const msg: any = await response.json();

    const assigneeIds: string[] = msg.tasks.map((task: any) => task.assigneeId);

    const data: any[] = await getDiscordIds(assigneeIds);

    const discordIds: string[] = [];

    //data contains arrays of User objects
    //we are looping over nested arrays and extracting discordIds

    data.forEach((d: UserBackend[]) => {
      d.forEach((dt: UserBackend) => {
        if (dt.user.discordId) {
          discordIds.push(dt.user.discordId);
        }
      });
    });

    return discordIds;
  } catch (e) {
    console.log(e);
  }
};
