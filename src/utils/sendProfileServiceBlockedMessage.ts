import { env } from "../typeDefinitions/default.types";
import config from "../../config/config";

export async function sendProfileServiceBlockedMessage(
  userId: string,
  reason: string,
  env: env
): Promise<void> {
  const helpGroupRoleId = config(env).PROFILE_SERVICE_HELP_GROUP_ID;
  const stringToBeSent = `Hello${userId ? ` <@${userId}>` : ""},\n${
    userId ? "Your" : "Someone's"
  } Profile Service is **BLOCKED** because of the below-mentioned reason.${
    userId
      ? ` Please visit the [MY SITE](https://my.realdevsquad.com/identity) to fix this.\nIf you have any issue related to profile service, you can tag <@&${helpGroupRoleId}> and ask for help.`
      : ""
  }\n\n**Reason:** \`${reason ? reason : "No reason provided"}\``;

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
}
