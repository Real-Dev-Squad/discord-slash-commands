import { env } from "../typeDefinitions/default.types";
import config from "../../config/config";

export async function sendTaskUpdate(
  completed: string,
  planned: string,
  blockers: string,
  discordId: string,
  taskId: string,
  env: env
): Promise<void> {
  const taskUrl = "https://status.realdevsquad.com/tasks/" + taskId;
  const formattedString =
    `<@${discordId}> added an update to his task: <${taskUrl}>\n` +
    `**Completed**\n${completed}\n\n` +
    `**Planned**\n${planned}\n\n` +
    `**Blockers**\n${blockers}`;
  console.log(formattedString);
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
