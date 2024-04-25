import { sendTaskUpdatesHandler } from "../../../src/controllers/taskUpdatesHandler";
import JSONResponse from "../../../src/utils/JsonResponse";
import * as response from "../../../src/constants/responses";
import { sendTaskUpdate } from "../../../src/utils/sendTaskUpdates";

import { generateDummyRequestObject } from "../../fixtures/fixture";

jest.mock("../../../src/utils/verifyAuthToken", () => ({
  verifyNodejsBackendAuthToken: jest.fn().mockResolvedValue(true),
}));
jest.mock("../../../src/utils/sendTaskUpdates", () => ({
  sendTaskUpdate: jest.fn().mockResolvedValue(undefined),
}));

describe("sendTaskUpdatesHandler", () => {
  const mockEnv = { DISCORD_TOKEN: "mockToken" };
  const mockData = {
    content: {
      completed: "Wrote test cases",
      planned: "Will test the feature at staging.",
      blockers: "NA",
      discordId: "12345678910",
      taskId: "79wMEIek990",
    },
  };
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("sendTaskUpdate function should return undefined after successfully sending the message", async () => {
    const { completed, planned, blockers, discordId, taskId } =
      mockData.content;
    const response = await sendTaskUpdate(
      completed,
      planned,
      blockers,
      discordId,
      taskId,
      mockEnv
    );
    expect(response).toBe(undefined);
  });

  it("should return Bad Signature object if no auth headers provided", async () => {
    const mockRequest = generateDummyRequestObject({ url: "/task/update" });
    const result: JSONResponse = await sendTaskUpdatesHandler(
      mockRequest,
      mockEnv
    );
    const jsonResponse: { error: string } = await result.json();
    expect(result.status).toBe(401);
    expect(jsonResponse).toEqual(response.UNAUTHORIZED);
  });
});
