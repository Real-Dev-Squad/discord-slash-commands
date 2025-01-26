import { env } from "../typeDefinitions/default.types";

export const sendReplyInDiscordChannel = async (
  discordReplyUrl: string,
  body: any,
  env: env
) => {
  await fetch(discordReplyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${env.DISCORD_TOKEN}`,
    },
    body: JSON.stringify({
      content: body,
    }),
  });
};
