import { UserStatus } from "../../../src/typeDefinitions/userStatus.type";
import { formatOOOMessage } from "../../../src/utils/formatOOOMessage";
import { userStatusMock, userFutureStatusMock } from "../../fixtures/fixture";

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
    const futureStatus = userFutureStatusMock.data.futureStatus;

    const futureFromDate = new Date(futureStatus?.from).toDateString();
    const futureToDate = new Date(futureStatus?.until).toDateString();

    const expectedMessage = `**Upcoming**:\n${futureFromDate} - ${futureToDate}\n${futureStatus?.message}\n`;
    const result = formatOOOMessage(userFutureStatusMock);

    expect(result).toEqual(expectedMessage);
  });

  it('returns "No data found!" when no OOO statuses are provided', () => {
    const userStatusData: UserStatus = {
      ...userStatusMock,
      data: {
        ...userStatusMock.data,
        currentStatus: {
          state: "ACTIVE",
          updatedAt: 1691398400000,
          from: 1691398400000,
          until: 1691484800000,
          message: "Active status message",
        },
      },
    };

    const expectedMessage = `User is currently **${userStatusData.data.currentStatus.state}**`;
    const result = formatOOOMessage(userStatusData);
    expect(result).toEqual(expectedMessage);
  });
});
