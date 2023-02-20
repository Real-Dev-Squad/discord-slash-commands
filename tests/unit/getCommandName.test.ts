import { HELLO, VERIFY } from "../../src/constants/commands";
import { getCommandName } from "../../src/utils/getCommandName";

describe("Test getCommandName function", () => {
  it("Returns hello command name in lower case", () => {
    const commandName = getCommandName(HELLO);
    expect(commandName).toBe("hello");
  });
  it("Returns Verify command name in lower case", () => {
    const commandName = getCommandName(VERIFY);
    expect(commandName).toBe("verify");
  });
});
