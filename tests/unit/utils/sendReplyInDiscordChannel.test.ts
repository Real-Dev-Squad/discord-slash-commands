import { sendReplyInDiscordChannel } from "../../../src/utils/sendReplyInDiscordChannel";

describe("sendReplyInDiscordChannel", () => {
  const discordReplyUrl = "<disocrd-url>";
  const content = "<dicord-content>;";
  const mockEnv = { DISCORD_TOKEN: "mockToken" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should call fetch", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue(new Response(content));

    await sendReplyInDiscordChannel(discordReplyUrl, content, mockEnv);

    expect(global.fetch).toHaveBeenCalledWith(discordReplyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
      },
      body: JSON.stringify({
        content: content,
      }),
    });
  });
});
