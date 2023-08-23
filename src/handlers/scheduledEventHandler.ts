import { env } from "../typeDefinitions/default.types";
import { taskOverDueDiscordMembers } from "../utils/taskOverDueDiscordMembers";
import * as error from "../constants/responses";
import { getDiscordIds } from "../utils/getDiscordIds";

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
        str += `\n`;
      }
    }

    const bodyObj = {
      content: str,
    };

    const res = await fetch(
      "https://discord.com/api/webhooks/1137198547691913246/E4Qv3sFMNtutQsIMg3TMgjR8Brw-awAw6Qs4ayYVE7wNFJpB6oEd0eQ_0nTVvS3BtSpm",
      {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${env.DISCORD_TOKEN}`,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
}
