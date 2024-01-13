import createDiscordHeaders from "../../../src/utils/createDiscordHeaders";

describe("createDiscordHeaders", () => {
  it("should return an object with Authorization key if only token is passed", () => {
    const header = createDiscordHeaders({ token: "1234567890" });
    expect(header.Authorization).toBe("Bot 1234567890");
    expect(header["X-Audit-Log-Reason"]).toBeFalsy();
  });
  it("should return an object with both prop Authorization and X-Audit-Log-Reason if resona and token prop are passed", () => {
    const header = createDiscordHeaders({ token: "1234567890", reson: "456" });
    expect(header.Authorization).toBe("Bot 1234567890");
    expect(header["X-Audit-Log-Reason"]).toBe("456");
  });
});
