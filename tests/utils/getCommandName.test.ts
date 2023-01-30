import {
  APPLY_CHANGE,
  GENERATE_LINK,
  HELLO_COMMAND,
} from "../../src/constants/commands";
import { getCommandName } from "../../src/utils/getCommandName";

describe("testing get command name utility", () => {
  it("returns 'hello' for HELLO_COMMAND", () => {
    expect(getCommandName(HELLO_COMMAND)).toBe("hello");
  });
  it("returns 'link' for GENERATE_LINK command", () => {
    expect(getCommandName(GENERATE_LINK)).toBe("link");
  });
  it("returns 'change' for APPLY_CHANGE command", () => {
    expect(getCommandName(APPLY_CHANGE)).toBe("change");
  });
});
