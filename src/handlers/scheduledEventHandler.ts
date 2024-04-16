import { env } from "../typeDefinitions/default.types";
import { taskOverDueDiscordMembers } from "../utils/taskOverDueDiscordMembers";
import config from "../../config/config";
import { SUPER_USER_ONE, SUPER_USER_TWO } from "../constants/variables";

export async function send(env: env): Promise<void> {
  try {
    const discordIds: string[] = await taskOverDueDiscordMembers();

    const superUsers = [SUPER_USER_ONE, SUPER_USER_TWO];
    const filteredDiscordIds = discordIds.filter(
      (id) => !superUsers.includes(id)
    );

    if (filteredDiscordIds.length === 0) {
      return;
    }

    //notifying the two users with the authority.
    let stringToBeSent = `<@${SUPER_USER_ONE}> <@${SUPER_USER_TWO}>\nThese people have their task running red:\n`;

    let forFormatting = 0;
    filteredDiscordIds.forEach((id: string) => {
      const discordUser = `<@${id}> `;
      stringToBeSent += discordUser;
      forFormatting++;
      if (forFormatting === 3) {
        //to keep 3 users/line
        forFormatting = 0;
        stringToBeSent += `\n`;
      }
    });

    const bodyObj = {
      content: stringToBeSent,
    };

    const url = config(env).TRACKING_CHANNEL_URL;

    await fetch(url, {
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
