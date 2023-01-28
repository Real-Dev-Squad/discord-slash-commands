import {
  HELLO_COMMAND,
  GENERATE_LINK,
  APPLY_CHANGE,
} from "./constants/commands";
import { config } from "dotenv";
import { DISCORD_BASE_URL } from "./constants/urls";
import { registerCommands } from "./utils/registerCommands";

config();

async function registerGuildCommands(
  discordBotToken?: string,
  discordApplicationId?: string,
  discordGuildId?: string
) {
  const commands = [HELLO_COMMAND, GENERATE_LINK, APPLY_CHANGE];

  try {
    if (!discordBotToken) throw new Error("Please provide a BOT TOKEN");
    if (!discordApplicationId)
      throw new Error("Please provide a DISCORD_APPLICATION_ID");
    if (!discordGuildId) throw new Error("Please provide a GUILD_ID");

    const registrationUrl = `${DISCORD_BASE_URL}/applications/${discordApplicationId}/guilds/${discordGuildId}/commands`;
    await registerCommands(registrationUrl, discordBotToken, commands);
  } catch (e) {
    console.log(e);
  }
}

registerGuildCommands(
  process.env.BOT_TOKEN,
  process.env.DISCORD_APPLICATION_ID,
  process.env.DISCORD_GUILD_ID
);
