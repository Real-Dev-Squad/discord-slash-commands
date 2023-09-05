import { UserStatus } from "../typeDefinitions/userStatus.type";

export function formatOOOMessage(userStatusData: UserStatus) {
  let msg = "";

  if (
    userStatusData.data.currentStatus &&
    userStatusData.data.currentStatus.state === "OOO"
  ) {
    const currentFromDate = new Date(
      userStatusData.data.currentStatus.from
    ).toDateString();
    const currentToDate = new Date(
      userStatusData.data.currentStatus.until
    ).toDateString();

    msg = msg.concat(
      `**Current**:\n${currentFromDate} - ${currentToDate}\n ${userStatusData.data.currentStatus.message}\n\n`
    );
  }

  if (
    userStatusData.data.futureStatus &&
    userStatusData.data.futureStatus.state === "OOO"
  ) {
    const futureFromDate = new Date(
      userStatusData.data.futureStatus.from
    ).toDateString();
    const futureToDate = new Date(
      userStatusData.data.futureStatus.until
    ).toDateString();

    msg = msg.concat(
      `**Upcoming**:\n${futureFromDate} - ${futureToDate}\n${userStatusData.data.futureStatus.message}\n`
    );
  }

  return msg ? msg : "No data found!";
}
