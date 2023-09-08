import { UserStatus } from "../typeDefinitions/userStatus.type";
import { formatDate } from "./formatDate";

export function formatOOOMessage(userStatusData: UserStatus) {
  let msg = "";

  if (
    userStatusData.data.currentStatus &&
    userStatusData.data.currentStatus.state === "OOO"
  ) {
    const currentFromDate = formatDate(userStatusData.data.currentStatus.from);
    const currentToDate = formatDate(userStatusData.data.currentStatus.until);

    msg = msg.concat(
      `**Current**:\n${currentFromDate} - ${currentToDate}\n ${userStatusData.data.currentStatus.message}\n\n`
    );
  }

  if (
    userStatusData.data.futureStatus &&
    userStatusData.data.futureStatus.state === "OOO"
  ) {
    const futureFromDate = formatDate(userStatusData.data.futureStatus.from);
    const futureToDate = formatDate(userStatusData.data.futureStatus.until);

    msg = msg.concat(
      `**Upcoming**:\n${futureFromDate} - ${futureToDate}\n${userStatusData.data.futureStatus.message}\n`
    );
  }

  return msg ? msg : "No data found!";
}
