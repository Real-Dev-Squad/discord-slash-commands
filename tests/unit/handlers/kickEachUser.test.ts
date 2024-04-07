import { kickEachUser } from "../../../src/controllers/kickEachUser";
import { discordTextResponse } from "../../../src/utils/discordResponse";
import { removeUsers } from "../../../src/utils/removeUsers";
import { transformedArgument, ctx } from "../../fixtures/fixture";

describe("kickEachUser", () => {
  it("should run when found no users with Matched Role", async () => {
    const env = {
      BOT_PUBLIC_KEY: "xyz",
      DISCORD_GUILD_ID: "123",
      DISCORD_TOKEN: "abc",
    };

    const { roleToBeTaggedObj } = transformedArgument; // Extracting roleToBeTaggedObj
    const response = kickEachUser(
      { roleToBeRemovedObj: roleToBeTaggedObj },
      env,
      ctx
    );

    expect(response).toBeInstanceOf(Promise);

    const textMessage: { data: { content: string } } = await response.then(
      (res) => res.json()
    );
    expect(textMessage.data.content).toBe(
      "Found no users with the matched role."
    );
  });

  it("should run when found users with Matched Role", async () => {
    const env = {
      BOT_PUBLIC_KEY: "xyz",
      DISCORD_GUILD_ID: "123",
      DISCORD_TOKEN: "abc",
    };

    const usersWithMatchingRole = [
      "<@282859044593598464>",
      "<@725745030706364447>",
    ] as string[];

    const { roleToBeTaggedObj } = transformedArgument; // Extracting roleToBeTaggedObj
    const response = kickEachUser(
      { roleToBeRemovedObj: roleToBeTaggedObj },
      env,
      ctx
    );

    expect(response).toEqual(
      expect.objectContaining({
        data: {
          content:
            "Found 2 users with the matched role, removing them shortly...",
        },
      })
    ); // Ensure correct response message

    // Check the arguments passed to removeUsers
    expect(removeUsers).toHaveBeenCalledWith(env, usersWithMatchingRole);

    expect(response).toBeInstanceOf(Promise);
  });
});
