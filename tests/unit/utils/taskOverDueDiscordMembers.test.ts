import { taskOverDueDiscordMembers } from "../../../src/utils/taskOverDueDiscordMembers";
import { overdueTaskUsers } from "../../fixtures/fixture";
import JSONResponse from "../../../src/utils/JsonResponse";
import { RDS_BASE_API_URL } from "../../../src/constants/urls";

describe("taskOverDueDiscordMembers()", () => {
  test("should return all the tasks which are overdue", async () => {
    const mockResponse = overdueTaskUsers;
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );
    const result = await taskOverDueDiscordMembers();
    const discordIds = mockResponse.users.map((user) => user.discordId);

    expect(result).toEqual(discordIds);

    expect(global.fetch).toHaveBeenCalledWith(
      `${RDS_BASE_API_URL}/users?query=filterBy:overdue_tasks`
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
      `${RDS_BASE_API_URL}/users?query=filterBy:overdue_tasks`
    );
  });
});
