import { env } from "../typeDefinitions/default.types";
import { taskOverDueDiscordMembers } from "../utils/taskOverDueDiscordMembers";
import * as error from "../constants/responses";
import { getDiscordIds } from "../utils/getDiscordIds";
import { RDS_TRACKING_CHANNEL_URL } from "../constants/urls";

const SUPER_USER_ONE = "154585730465660929";
const SUPER_USER_TWO = "1040700289348542566";

export async function send(env: env): Promise<void> {
  try {
    const assigneeIds: string[] | string = await taskOverDueDiscordMembers();

    //A user might have more than one task which are running red
    //so to mention them just once, we are using Set to filter out
    const discordIds: string[] | string = await getDiscordIds(assigneeIds);
    const uniqueDiscordIds = [...new Set(discordIds)];

    //notifying the two users with the authority.
    let stringToBeSent = `<@${SUPER_USER_ONE}> <@${SUPER_USER_TWO}>\nThese people have their task running red:\n`;

    let forFormatting = 0;
    uniqueDiscordIds.forEach((id) => {
      const s = `<@${id}> `;
      stringToBeSent += s;
      forFormatting++;
      if (forFormatting === 3) {
        //to keep 3 users/line
        forFormatting = 0;
        stringToBeSent += `\n`;
      }
    });

    if (
      assigneeIds === error.INTERNAL_SERVER_ERROR ||
      discordIds === error.INTERNAL_SERVER_ERROR
    ) {
      throw new Error(error.INTERNAL_SERVER_ERROR);
    }

    const bodyObj = {
      content: stringToBeSent,
    };

    const url = `${RDS_TRACKING_CHANNEL_URL}`;

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(bodyObj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
      },
    });
  } catch (e) {
    console.log(e);
  }
}
