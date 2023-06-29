import { RETRY_COMMAND } from "../constants/responses";
import { GITHUB_REPOS_API, HELP_DATA_API } from "../constants/urls";
import { helpType, repoType } from "../typeDefinitions/help.types";
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
      return discordTextResponse(RETRY_COMMAND);
    }
  } else if (keyword === "repos") {
    try {
      const response = await fetch(GITHUB_REPOS_API);
      const data: repoType = await response.json();

      const repoList = data.data
        .map((item: { name: string; url: string }, index: number) => {
          const serialNumber = index + 1;
          return `${serialNumber}. [${item.name}](${item.url})`;
        })
        .join("\n");

      const responseMessage = `**Available repositories:**\n${repoList}`;
      const note =
        "\n\n**Note:** For more repositories, please visit [REAL DEV SQUAD](https://github.com/real-dev-squad) on GitHub.";
      return discordTextResponse(responseMessage + note);
    } catch (error) {
      console.error(error);
      return discordTextResponse(RETRY_COMMAND);
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
      return discordTextResponse(RETRY_COMMAND);
    }
  }
}
