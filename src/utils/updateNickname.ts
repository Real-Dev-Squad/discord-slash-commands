import { DISCORD_BASE_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";

export async function updateNickName(
  discordId: string,
  nickname: string,
  env: env
) {
  const changeNickNameURL = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/members/${discordId}`;
  const data = { nick: nickname };
  const nameChangeResponse = await fetch(changeNickNameURL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${env.DISCORD_TOKEN}`,
    },
    body: JSON.stringify(data),
  });
  if (nameChangeResponse.ok) {
    return await nameChangeResponse.json();
  }
  return "Failed";
}
