import { kickEachUser } from "../../../src/controllers/kickEachUser";
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

    const roleID = roleToBeTaggedObj.value;

    expect(response).toBeInstanceOf(Promise);

    const textMessage: { data: { content: string } } = await response.then(
      (res) => res.json()
    );
    expect(textMessage.data.content).toBe(
      `We couldn't find any user(s) assigned to <@&${roleID}> role.`
    );
  });
});
