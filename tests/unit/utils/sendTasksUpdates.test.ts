import config from "../../../config/config";
import JSONResponse from "../../../src/utils/JsonResponse";
import { sendTaskUpdate } from "../../../src/utils/sendTaskUpdates";

describe("sendTaskUpdate function", () => {
  const mockEnv = { DISCORD_TOKEN: "mockToken" };
  const completed = "Task completed successfully";
  const planned = "Plan for the next phase";
  const blockers = "No blockers";
  const userName = "Tejas";
  const taskId = "69nduIn210";
  const taskTitle = "Hyperlink as task title";
  const taskUrl = config(mockEnv).RDS_STATUS_SITE_URL + `/tasks/${taskId}`;
  const assertFetchCall = (url: string, bodyObj: any, mockEnv: any) => {
    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${mockEnv.DISCORD_TOKEN}`,
      },
      body: JSON.stringify(bodyObj),
    });
  };

  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should throw an error if response status is not OK", async () => {
    const url = config(mockEnv).TRACKING_CHANNEL_URL;
    const formattedString =
      `**${userName}** added an update to their task: [${taskTitle}](<${taskUrl}>)\n` +
      `\n**Completed**\n${completed}\n\n` +
      `**Planned**\n${planned}\n\n` +
      `**Blockers**\n${blockers}`;
    const bodyObj = {
      content: formattedString,
    };

    jest
      .spyOn(global, "fetch")
      .mockResolvedValueOnce(
        new JSONResponse("", { status: 400, statusText: "Bad Request" })
      );

    await expect(
      sendTaskUpdate(
        { completed, planned, blockers, userName, taskId, taskTitle },
        mockEnv
      )
    ).rejects.toThrowError("Failed to send task update: 400 - Bad Request");

    assertFetchCall(url, bodyObj, mockEnv);
  });

  test("should send the task update to discord tracking channel when all fields are present", async () => {
    const url = config(mockEnv).TRACKING_CHANNEL_URL;
    const formattedString =
      `**${userName}** added an update to their task: [${taskTitle}](<${taskUrl}>)\n` +
      `\n**Completed**\n${completed}\n\n` +
      `**Planned**\n${planned}\n\n` +
      `**Blockers**\n${blockers}`;
    const bodyObj = {
      content: formattedString,
    };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse("")));

    await sendTaskUpdate(
      { completed, planned, blockers, userName, taskId, taskTitle },
      mockEnv
    );

    assertFetchCall(url, bodyObj, mockEnv);
  });

  test("should send the task update to discord tracking channel when only completed is present", async () => {
    const url = config(mockEnv).TRACKING_CHANNEL_URL;
    const formattedString =
      `**${userName}** added an update to their task: [${taskTitle}](<${taskUrl}>)\n` +
      `\n**Completed**\n${completed}\n\n` +
      `**Planned**\n\n\n` +
      `**Blockers**\n`;
    const bodyObj = {
      content: formattedString,
    };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse("")));

    await sendTaskUpdate(
      { completed, planned: "", blockers: "", userName, taskId, taskTitle },
      mockEnv
    );

    assertFetchCall(url, bodyObj, mockEnv);
  });

  test("should send the task update to discord tracking channel when only planned is present", async () => {
    const url = config(mockEnv).TRACKING_CHANNEL_URL;
    const formattedString =
      `**${userName}** added an update to their task: [${taskTitle}](<${taskUrl}>)\n` +
      `\n**Completed**\n\n\n` +
      `**Planned**\n${planned}\n\n` +
      `**Blockers**\n`;
    const bodyObj = {
      content: formattedString,
    };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse("")));

    await sendTaskUpdate(
      { completed: "", planned, blockers: "", userName, taskId, taskTitle },
      mockEnv
    );

    assertFetchCall(url, bodyObj, mockEnv);
  });

  test("should send the task update to discord tracking channel when only blockers is present", async () => {
    const url = config(mockEnv).TRACKING_CHANNEL_URL;
    const formattedString =
      `**${userName}** added an update to their task: [${taskTitle}](<${taskUrl}>)\n` +
      `\n**Completed**\n\n\n` +
      `**Planned**\n\n\n` +
      `**Blockers**\n${blockers}`;
    const bodyObj = {
      content: formattedString,
    };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse("")));

    await sendTaskUpdate(
      { completed: "", planned: "", blockers, userName, taskId, taskTitle },
      mockEnv
    );

    assertFetchCall(url, bodyObj, mockEnv);
  });

  test("should send the task update to discord tracking channel when only completed and planned are present", async () => {
    const url = config(mockEnv).TRACKING_CHANNEL_URL;
    const formattedString =
      `**${userName}** added an update to their task: [${taskTitle}](<${taskUrl}>)\n` +
      `\n**Completed**\n${completed}\n\n` +
      `**Planned**\n${planned}\n\n` +
      `**Blockers**\n`;
    const bodyObj = {
      content: formattedString,
    };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse("")));

    await sendTaskUpdate(
      { completed, planned, blockers: "", userName, taskId, taskTitle },
      mockEnv
    );

    assertFetchCall(url, bodyObj, mockEnv);
  });

  test("should send the task update to discord tracking channel when only completed and blockers are present", async () => {
    const url = config(mockEnv).TRACKING_CHANNEL_URL;
    const formattedString =
      `**${userName}** added an update to their task: [${taskTitle}](<${taskUrl}>)\n` +
      `\n**Completed**\n${completed}\n\n` +
      `**Planned**\n\n\n` +
      `**Blockers**\n${blockers}`;
    const bodyObj = {
      content: formattedString,
    };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse("")));

    await sendTaskUpdate(
      { completed, planned: "", blockers, userName, taskId, taskTitle },
      mockEnv
    );

    assertFetchCall(url, bodyObj, mockEnv);
  });

  test("should send the task update to discord tracking channel when only planned and blockers are present", async () => {
    const url = config(mockEnv).TRACKING_CHANNEL_URL;
    const formattedString =
      `**${userName}** added an update to their task: [${taskTitle}](<${taskUrl}>)\n` +
      `\n**Completed**\n\n\n` +
      `**Planned**\n${planned}\n\n` +
      `**Blockers**\n${blockers}`;
    const bodyObj = {
      content: formattedString,
    };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse("")));

    await sendTaskUpdate(
      { completed: "", planned, blockers, userName, taskId, taskTitle },
      mockEnv
    );

    assertFetchCall(url, bodyObj, mockEnv);
  });

  test("should send the standup update to discord tracking channel when task id is absent", async () => {
    const url = config(mockEnv).TRACKING_CHANNEL_URL;
    const formattedString =
      `**${userName}** added a standup update\n` +
      `\n**Completed**\n${completed}\n\n` +
      `**Planned**\n${planned}\n\n` +
      `**Blockers**\n${blockers}`;
    const bodyObj = {
      content: formattedString,
    };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse("")));

    await sendTaskUpdate({ completed, planned, blockers, userName }, mockEnv);

    assertFetchCall(url, bodyObj, mockEnv);
  });
});
