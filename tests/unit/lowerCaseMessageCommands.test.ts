import { lowerCaseMessageCommands } from "../../src/utils/lowerCaseMessageCommand";
import { dummyHelloMessage, dummyVerifyMessage } from "../fixtures/fixture";

describe("Test LowerCaseMessageCommand function", () => {
  it("Should return the `HELLO` message in lower case", () => {
    const commandInLowerCase = lowerCaseMessageCommands(dummyHelloMessage);
    expect(commandInLowerCase).toBe("hello");
  });
  it("Should Return the `VERIFY` message in lower case", () => {
    const commandInLowerCase = lowerCaseMessageCommands(dummyVerifyMessage);
    expect(commandInLowerCase).toBe("verify");
  });
});
