import { env } from "../typeDefinitions/default.types";
import config from "../../config/config";

export async function sendTaskUpdate(
  completed: string,
  planned: string,
  blockers: string,
  env: env
): Promise<void> {
  const formattedString = `**Completed**: ${completed}\n\n**Planned**: ${planned}\n\n**Blockers**: ${blockers}`;
  const bodyObj = {
    content: formattedString,
  };
  const url = config(env).TRACKING_CHANNEL_URL;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(bodyObj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to send task update: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error occurred while sending task update:", error);
    throw error;
  }
}
