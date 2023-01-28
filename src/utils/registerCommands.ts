import { fetch } from "./fetch";
import { commandTypes } from "../typeDefinitions/register.types";

export async function registerCommands(
  url: string,
  discordBotToken: string,
  commands: Array<commandTypes>
) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${discordBotToken}`,
      },
      method: "PUT",
      body: JSON.stringify(commands),
    });

    if (response.ok) console.log("Registered all commands");
    else console.error("Error Registering Commands");
  } catch (error) {
    console.error(error);
  }
}
