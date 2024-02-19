import { env } from "../typeDefinitions/default.types";
import config from "../../config/config";

export async function sendProfileServiceBlockedMessage(
  userId: string,
  reason: string,
  env: env
): Promise<void> {
  const stringToBeSent = `Hey${userId ? ` <@${userId}>` : ""},\n${
    userId ? "Your" : "Someone's"
  } Profile Service is **BLOCKED** because of the below-mentioned reason.${
    userId
      ? " Please visit the [MY SITE](https://my.realdevsquad.com/identity) to fix this."
      : ""
  }\n**Reason:** \`${reason ? reason : "No reason provided"}\``;

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
