import { formatStatusToTitleCase } from "../../../src/utils/formatStatusToTitleCase";

describe("Test formatStatusToTitleCase function", () => {
  it("Should return a string", () => {
    const status = formatStatusToTitleCase("IN_PROGRESS");
    expect(typeof status).toBe("string");
  });

  it("Should return a string with first letter of each word capitalized", () => {
    const status = formatStatusToTitleCase("IN_PROGRESS");
    expect(status).toBe("In Progress");
  });
});
