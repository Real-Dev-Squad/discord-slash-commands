import { env } from "../typeDefinitions/default.types";
import config from "../../config/config";

export async function sendTaskUpdate(
  completed: string,
  planned: string,
  blockers: string,
  userName: string,
  taskId: string,
  env: env
): Promise<void> {
  const taskUrl = config(env).RDS_STATUS_SITE_URL + `/tasks/${taskId}`;
  const formattedString =
    `${userName} added an update to the task: <${taskUrl}>\n` +
    `**Completed**\n${completed}\n\n` +
    `**Planned**\n${planned}\n\n` +
    `**Blockers**\n${blockers}`;
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
