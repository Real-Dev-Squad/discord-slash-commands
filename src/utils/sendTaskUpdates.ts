import { env } from "../typeDefinitions/default.types";
import config from "../../config/config";

export async function sendTaskUpdate(
  completed: string,
  planned: string,
  blockers: string,
  env: env
): Promise<void> {
  try {
    const formattedString = `**Completed**: ${completed}\n\n**Planned**: ${planned}\n\n**Blockers**: ${blockers}`;
    const bodyObj = {
      content: formattedString,
    };
    const url = config(env).TRACKING_CHANNEL_URL;
    console.log(url);
    const messageRes = await fetch(url, {
      method: "POST",
      body: JSON.stringify(bodyObj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
      },
    });
    console.log(await messageRes.json());
    return;
  } catch (error) {
    console.log(error);
  }

  return;
}
