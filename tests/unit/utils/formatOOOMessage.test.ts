import { UserStatus } from "../../../src/typeDefinitions/userStatus.type";
import { formatOOOMessage } from "../../../src/utils/formatOOOMessage";
import { userStatusMock } from "../../fixtures/fixture";
import { formatDate } from "../../../src/utils/formatDate";

describe("formatOOOMessage", () => {
  it("formats an OOO message correctly when both current and future statuses are OOO", () => {
    const currentStatus = userStatusMock.data.currentStatus;
    const futureStatus = userStatusMock.data.futureStatus;

    const currentFromDate = formatDate(currentStatus.from);
    const currentToDate = formatDate(currentStatus.until);
    const futureFromDate = formatDate(futureStatus.from);
    const futureToDate = formatDate(futureStatus.until);

    const expectedMessage = `**Current**:\n${currentFromDate} - ${currentToDate}\n ${currentStatus.message}\n\n**Upcoming**:\n${futureFromDate} - ${futureToDate}\n${futureStatus.message}\n`;

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
          updatedAt: 1690875555000,
          from: 1690875555000,
          until: "2023-08-31T00:00:00.000Z",
          message: "Active status message",
        },
        futureStatus: {
          state: "IDLE",
          updatedAt: 1690961955000,
          from: 1690961955000,
          until: "2023-09-02T00:00:00.000Z",
          message: "Idle status message",
        },
        monthlyHours: {
          committed: 40,
          updatedAt: 1690993955000,
        },
      },
      message: "User Status found successfully.",
    };

    const expectedMessage = "No data found!";

    const result = formatOOOMessage(data);

    expect(result).toEqual(expectedMessage);
  });
});
