import { env } from "../typeDefinitions/default.types";
import { taskOverDueDiscordMembers } from "../utils/taskOverDueDiscordMembers";
import * as error from "../constants/responses";
import { getDiscordIds } from "../utils/getDiscordIds";
import { RDS_TRACKING_CHANNEL_URL } from "../constants/urls";

export async function send(env: env): Promise<void> {
  try {
    const assigneeIds: string[] | string = await taskOverDueDiscordMembers();

    //A user might have more than one task which are running red
    //so to mention them just once, we are using Set to filter out
    const discordIds: string[] | string = await getDiscordIds(assigneeIds);
    const uniqueDiscordIds = [...new Set(discordIds)];

    //notifying the two users with the authority.
    let str = `<@154585730465660929> <@1040700289348542566>\nThese people have their task running red:\n`;

    let forFormatting = 0;
    for (let i = 0; i < uniqueDiscordIds?.length; i++) {
      const s = `<@${uniqueDiscordIds[i]}> `;
      str += s;
      forFormatting++;
      if (forFormatting === 3) {
        forFormatting = 0;
        str += `\n`;
      }
    }

    if (
      assigneeIds === error.INTERNAL_SERVER_ERROR ||
      discordIds === error.INTERNAL_SERVER_ERROR
    ) {
      str = "Something went wrong!";
    }

    const bodyObj = {
      content: str,
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
