import { env } from "../typeDefinitions/default.types";
import config from "../../config/config";

// export const generateStringToBeSent = (update: string) => { // will generate line separated like 1. progress
//                                                                                                  2. planned
//                                                                                                  3. blockers
//   return update;
// };

export async function sendProfileServiceBlockedMessage(
  update: string,
  env: env
): Promise<void> {
  const stringToBeSent = update;

  const bodyObj = {
    content: stringToBeSent,
  };

  const url = config(env).TRACKING_CHANNEL_URL; // this will get updated to a new channel ul

  await fetch(url, {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${env.DISCORD_TOKEN}`,
    },
  });
}
