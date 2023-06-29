import { HELP_DATA_API } from "../constants/urls";
import { helpType } from "../typeDefinitions/help.types";
import { discordTextResponse } from "../utils/discordResponse";
import JSONResponse from "../utils/JsonResponse";

export async function helpCommand(keyword: string): Promise<JSONResponse> {
  if (keyword === "help") {
    try {
      const response = await fetch(HELP_DATA_API);
      const data: helpType = await response.json();

      const keywords = data.data.map(
        (item: { keyword: string }) => item.keyword
      );
      const keywordsList = keywords.join(", ");

      const responseMessage = `**Available commands:** ${keywordsList}`;
      return discordTextResponse(responseMessage);
    } catch (error) {
      console.error(error);
      return discordTextResponse(
        "Something went wrong. Please try again later."
      );
    }
  } else {
    try {
      const response = await fetch(HELP_DATA_API);
      const data: helpType = await response.json();

      const foundKeyword = data.data.find(
        (item: { keyword: string; answer: string }) => item.keyword === keyword
      );

      if (foundKeyword) {
        return discordTextResponse(foundKeyword.answer);
      } else {
        return discordTextResponse(
          `**${keyword}** is not a valid command. Please use **help** to see all available commands.`
        );
      }
    } catch (error) {
      console.error(error);
      return discordTextResponse(
        "Something went wrong. Please try again later."
      );
    }
  }
}
