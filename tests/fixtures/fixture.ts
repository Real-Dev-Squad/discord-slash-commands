import { discordMessageRequest } from "../../src/typeDefinitions/discordMessage.types";
import { InteractionType } from "discord-interactions";

export const dummyHelloMessage: discordMessageRequest = {
  type: InteractionType.APPLICATION_COMMAND,
  data: {
    name: "Hello",
  },
  member: {
    user: {
      id: 123456,
      username: "ritik",
      avatar: "d1eaa8f8ab5e8235e08e659aef5dfeac",
      discriminator: "1234",
    },
  },
  guild_id: 123456,
};

export const dummyVerifyMessage: discordMessageRequest = {
  type: InteractionType.APPLICATION_COMMAND,
  data: {
    name: "VERIFY",
  },
  member: {
    user: {
      id: 123456,
      username: "ritik",
      avatar: "d1eaa8f8ab5e8235e08e659aef5dfeac",
      discriminator: "1234",
    },
  },
  guild_id: 123456,
};
