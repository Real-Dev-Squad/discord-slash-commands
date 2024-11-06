import {
  HELLO,
  MENTION_EACH,
  VERIFY,
  LISTENING,
  TASK,
  NOTIFY_OVERDUE,
  NOTIFY_ONBOARDING,
  OOO,
  USER,
  REMOVE,
  GROUP_INVITE,
} from "./constants/commands";
import { config } from "dotenv";
import { DISCORD_BASE_URL } from "./constants/urls";
import { registerCommands } from "./utils/registerCommands";
import { loadEnv } from "../config/config";

config();

/**
 *
 * @param discordBotToken { String }: Token for your Discord Bot
 * @param discordApplicationId { String }: Application Id of your discord bot
 * @param discordGuildId { String }: Guild id in which commands are to be installed.
 */

async function registerGuildCommands(
  discordBotToken?: string,
  discordApplicationId?: string,
  discordGuildId?: string
) {
  const commands = [
    HELLO,
    VERIFY,
    MENTION_EACH,
    LISTENING,
    TASK,
    OOO,
    USER,
    NOTIFY_OVERDUE,
    NOTIFY_ONBOARDING,
    REMOVE,
    GROUP_INVITE,
  ];

  try {
    if (!discordBotToken) throw new Error("Please provide a BOT TOKEN");
    if (!discordApplicationId)
      throw new Error("Please provide a DISCORD_APPLICATION_ID");
    if (!discordGuildId) throw new Error("Please provide a GUILD_ID");

    const registrationUrl = `${DISCORD_BASE_URL}/applications/${discordApplicationId}/guilds/${discordGuildId}/commands`;
    await registerCommands(registrationUrl, discordBotToken, commands);
  } catch (e) {
    console.error(e);
  }
}

const env = loadEnv({}, false);

registerGuildCommands(
  env.DISCORD_TOKEN,
  env.DISCORD_APPLICATION_ID,
  env.DISCORD_GUILD_ID
);
