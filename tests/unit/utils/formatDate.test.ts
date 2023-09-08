import { formatDate } from "../../../src/utils/formatDate";

describe("Test formatDate function", () => {
  it("Should return a string", () => {
    const date = formatDate(1627708800);
    expect(typeof date).toBe("string");
  });

  it("Should return a date in the format", () => {
    const date = formatDate(1627708800);
    expect(date).toBe("31 July 2021, 10:50 AM IST");
  });
});
