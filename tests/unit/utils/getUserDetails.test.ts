import { getUserDetails } from "../../../src/utils/getUserDetails";
import { FAILED_TO_FETCH_TASKS } from "../../../src/constants/responses";
import { RDS_BASE_API_URL } from "../../../src/constants/urls";
import JSONResponse from "../../../src/utils/JsonResponse";

describe("Test getUserDetails function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should return user details", async () => {
    const userData = {
      user: {
        discordId: "123456",
        first_name: "John",
        last_name: "Doe",
        discordJoinedAt: "2023-09-13T09:30:00.000Z",
        state: "Active",
      },
    };

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new JSONResponse(userData)));

    const userId = "123456";
    const result = await getUserDetails(userId);

    expect(global.fetch).toHaveBeenCalledWith(
      `${RDS_BASE_API_URL}/users/?dev=true&discordId=${userId}`
    );
  });

  it("Should throw an error if response is not ok", async () => {
    const mockErrorResponse = {
      message: `Failed to fetch user details for 123456.`,
    };
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockErrorResponse, { status: 400 }))
      );

    const userId = "123456";
    await expect(() => getUserDetails(userId)).rejects.toThrow(
      mockErrorResponse.message
    );

    expect(global.fetch).toHaveBeenCalledWith(
      `${RDS_BASE_API_URL}/users/?dev=true&discordId=${userId}`
    );
  });
});
