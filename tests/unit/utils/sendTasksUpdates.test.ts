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

  test("should send the task update to discord tracking channel when all fields are present", async () => {
    const url = config(mockEnv).TRACKING_CHANNEL_URL;
    const formattedString =
      `${userName} added an update to the task: <${taskUrl}>\n` +
      `**Completed**\n${completed}\n\n` +
      `**Planned**\n${planned}\n\n` +
      `**Blockers**\n${blockers}`;
    const bodyObj = {
      content: formattedString,
    };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse("")));

    await sendTaskUpdate(
      completed,
      planned,
      blockers,
      userName,
      taskId,
      mockEnv
    );

    assertFetchCall(url, bodyObj, mockEnv);
  });

  test("should send the task update to discord tracking channel when only completed is present", async () => {
    const url = config(mockEnv).TRACKING_CHANNEL_URL;
    const formattedString =
      `${userName} added an update to the task: <${taskUrl}>\n` +
      `**Completed**\n${completed}\n\n` +
      `**Planned**\n\n\n` +
      `**Blockers**\n`;
    const bodyObj = {
      content: formattedString,
    };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse("")));

    await sendTaskUpdate(completed, "", "", userName, taskId, mockEnv);

    assertFetchCall(url, bodyObj, mockEnv);
  });

  test("should send the task update to discord tracking channel when only planned is present", async () => {
    const url = config(mockEnv).TRACKING_CHANNEL_URL;
    const formattedString =
      `${userName} added an update to the task: <${taskUrl}>\n` +
      `**Completed**\n\n\n` +
      `**Planned**\n${planned}\n\n` +
      `**Blockers**\n`;
    const bodyObj = {
      content: formattedString,
    };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse("")));

    await sendTaskUpdate("", planned, "", userName, taskId, mockEnv);

    assertFetchCall(url, bodyObj, mockEnv);
  });

  test("should send the task update to discord tracking channel when only blockers is present", async () => {
    const url = config(mockEnv).TRACKING_CHANNEL_URL;
    const formattedString =
      `${userName} added an update to the task: <${taskUrl}>\n` +
      `**Completed**\n\n\n` +
      `**Planned**\n\n\n` +
      `**Blockers**\n${blockers}`;
    const bodyObj = {
      content: formattedString,
    };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse("")));

    await sendTaskUpdate("", "", blockers, userName, taskId, mockEnv);

    assertFetchCall(url, bodyObj, mockEnv);
  });

  test("should send the task update to discord tracking channel when only completed and planned are present", async () => {
    const url = config(mockEnv).TRACKING_CHANNEL_URL;
    const formattedString =
      `${userName} added an update to the task: <${taskUrl}>\n` +
      `**Completed**\n${completed}\n\n` +
      `**Planned**\n${planned}\n\n` +
      `**Blockers**\n`;
    const bodyObj = {
      content: formattedString,
    };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse("")));

    await sendTaskUpdate(completed, planned, "", userName, taskId, mockEnv);

    assertFetchCall(url, bodyObj, mockEnv);
  });

  test("should send the task update to discord tracking channel when only completed and blockers are present", async () => {
    const url = config(mockEnv).TRACKING_CHANNEL_URL;
    const formattedString =
      `${userName} added an update to the task: <${taskUrl}>\n` +
      `**Completed**\n${completed}\n\n` +
      `**Planned**\n\n\n` +
      `**Blockers**\n${blockers}`;
    const bodyObj = {
      content: formattedString,
    };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse("")));

    await sendTaskUpdate(completed, "", blockers, userName, taskId, mockEnv);

    assertFetchCall(url, bodyObj, mockEnv);
  });

  test("should send the task update to discord tracking channel when only planned and blockers are present", async () => {
    const url = config(mockEnv).TRACKING_CHANNEL_URL;
    const formattedString =
      `${userName} added an update to the task: <${taskUrl}>\n` +
      `**Completed**\n\n\n` +
      `**Planned**\n${planned}\n\n` +
      `**Blockers**\n${blockers}`;
    const bodyObj = {
      content: formattedString,
    };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse("")));

    await sendTaskUpdate("", planned, blockers, userName, taskId, mockEnv);

    assertFetchCall(url, bodyObj, mockEnv);
  });
});
