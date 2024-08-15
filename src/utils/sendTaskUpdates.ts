import { env } from "../typeDefinitions/default.types";
import config from "../../config/config";
import { TaskUpdates } from "../typeDefinitions/taskUpdate";

export async function sendTaskUpdate(
  { completed, planned, blockers, userName, taskId, taskTitle }: TaskUpdates,
  env: env
): Promise<void> {
  const taskUrl = taskId
    ? config(env).RDS_STATUS_SITE_URL + `/tasks/${taskId}`
    : "";

  const progressTitle = taskId
    ? `**${userName}** added an update to their task: [${taskTitle}](<${taskUrl}>)`
    : `**${userName}** added a standup update`;
  const formattedString =
    `${progressTitle}\n` +
    `\n**Completed**\n${completed}\n\n` +
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
