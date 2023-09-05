import { UserStatus } from "../../../src/typeDefinitions/userStatus.type";
import { formatOOOMessage } from "../../../src/utils/formatOOOMessage"; // Import the module containing your function
import { userStatusMock } from "../../fixtures/fixture";

describe("formatOOOMessage", () => {
  it("formats an OOO message correctly when both current and future statuses are OOO", () => {
    const expectedMessage = `**Current**:\nWed Aug 30 2023 - Thu Aug 31 2023\n Out of office message for today\n\n**Upcoming**:\nFri Sep 01 2023 - Sat Sep 02 2023\nUpcoming out of office message\n`;
    const result = formatOOOMessage(userStatusMock);
    expect(result).toEqual(expectedMessage);
  });

  it('returns "No data found!" when no OOO statuses are provided', () => {
    const data: UserStatus = {
      id: "someId",
      userId: "someUserId",
      data: {
        userId: "someUserId",
        currentStatus: {
          state: "ACTIVE",
          updatedAt: "2023-08-30T00:00:00.000Z",
          from: "2023-08-30T00:00:00.000Z",
          until: "2023-08-31T00:00:00.000Z",
          message: "Active status message",
        },
        futureStatus: {
          state: "IDLE",
          updatedAt: "2023-09-01T00:00:00.000Z",
          from: "2023-09-01T00:00:00.000Z",
          until: "2023-09-02T00:00:00.000Z",
          message: "Idle status message",
        },
        monthlyHours: {
          committed: 40,
          updatedAt: "2023-08-01T00:00:00.000Z",
        },
      },
      message: "User Status found successfully.",
    };

    const expectedMessage = "No data found!";

    const result = formatOOOMessage(data);

    expect(result).toEqual(expectedMessage);
  });
});
