import config from "../../../config/config";
import JSONResponse from "../../../src/utils/JsonResponse";
import { sendTaskUpdate } from "../../../src/utils/sendTaskUpdates";

describe("sendTaskUpdate function", () => {
  const mockEnv = { DISCORD_TOKEN: "mockToken" };
  const completed = "Task completed successfully";
  const planned = "Plan for the next phase";
  const blockers = "No blockers";

  test("should send the task update to discord tracking channel.", async () => {
    const url = config(mockEnv).TRACKING_CHANNEL_URL;
    const formattedString = `**Completed**: ${completed}\n\n**Planned**: ${planned}\n\n**Blockers**: ${blockers}`;
    const bodyObj = {
      content: formattedString,
    };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse("")));

    await sendTaskUpdate(completed, planned, blockers, mockEnv);

    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
      },
      body: JSON.stringify(bodyObj),
    });
  });
});
