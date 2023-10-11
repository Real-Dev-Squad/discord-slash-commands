import { taskOverDueDiscordMembers } from "../../../src/utils/taskOverDueDiscordMembers";
import { taskOverdueMock } from "../../fixtures/fixture";
import JSONResponse from "../../../src/utils/JsonResponse";
import { RDS_BASE_API_URL } from "../../../src/constants/urls";

describe("taskOverDueDiscordMembers()", () => {
  test("should return all the tasks which are overdue", async () => {
    const mockResponse = taskOverdueMock;
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );
    const result = await taskOverDueDiscordMembers();

    expect(result).toEqual([taskOverdueMock.tasks[0].assigneeId]);

    expect(global.fetch).toHaveBeenCalledWith(
      `${RDS_BASE_API_URL}/tasks?dev=true&status=overdue&size=100`
    );

    expect(global.fetch).toBeCalledTimes(1);
  });

  test("should return internal server error", async () => {
    jest
      .spyOn(global, "fetch")
      .mockRejectedValueOnce(new Error("Network error"));

    try {
      await taskOverDueDiscordMembers();
    } catch (error: any) {
      expect(error.message).toEqual("Network error");
    }

    expect(global.fetch).toHaveBeenCalledWith(
      `${RDS_BASE_API_URL}/tasks?dev=true&status=overdue&size=100`
    );
  });
});
