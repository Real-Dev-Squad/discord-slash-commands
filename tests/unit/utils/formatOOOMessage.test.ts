import { UserStatus } from "../../../src/typeDefinitions/userStatus.type";
import { formatOOOMessage } from "../../../src/utils/formatOOOMessage";
import { userStatusMock } from "../../fixtures/fixture";

describe("formatOOOMessage", () => {
  it("formats an OOO message correctly when current status is OOO", () => {
    const currentStatus = userStatusMock.data.currentStatus;
    const currentFromDate = new Date(currentStatus.from).toDateString();
    const currentToDate = new Date(currentStatus.until).toDateString();

    const expectedMessage = `**Current**:\n${currentFromDate} - ${currentToDate}\n${currentStatus.message}\n`;
    const result = formatOOOMessage(userStatusMock);

    expect(result.replace(/\s/g, "")).toEqual(
      expectedMessage.replace(/\s/g, "")
    );
  });

  it("formats an OOO message correctly when the future status is OOO", () => {
    const userStatusMockWithOOOFuture: UserStatus = {
      id: "someId",
      userId: "someUserId",
      data: {
        userId: "someUserId",
        currentStatus: {
          state: "ACTIVE",
          updatedAt: "2023-08-30T00:00:00.000Z",
          from: "2023-08-30T00:00:00.000Z",
          until: "",
          message: "Active status message",
        },
        futureStatus: {
          state: "OOO",
          updatedAt: "2023-09-01T00:00:00.000Z",
          from: "2023-09-01T00:00:00.000Z",
          until: "2023-09-02T00:00:00.000Z",
          message: "Upcoming out of office message",
        },
        monthlyHours: {
          committed: 40,
          updatedAt: "2023-08-01T00:00:00.000Z",
        },
      },
      message: "User Status found successfully.",
    };

    const futureStatus = userStatusMockWithOOOFuture.data.futureStatus;

    const futureFromDate = new Date(futureStatus?.from).toDateString();
    const futureToDate = new Date(futureStatus?.until).toDateString();

    const expectedMessage = `**Upcoming**:\n${futureFromDate} - ${futureToDate}\n${futureStatus?.message}\n`;
    const result = formatOOOMessage(userStatusMockWithOOOFuture);

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
