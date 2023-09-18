import { UserStatus } from "../typeDefinitions/userStatus.type";

export function formatOOOMessage(userStatusData: UserStatus) {
  let msg: string;
  const currentStatusState = userStatusData.data.currentStatus.state;
  const futureStatusState = userStatusData.data.futureStatus?.state;
  if (currentStatusState === "OOO") {
    const currentFromDate = new Date(
      userStatusData.data.currentStatus.from
    ).toDateString();
    const currentToDate = new Date(
      userStatusData.data.currentStatus.until
    ).toDateString();
    msg = `**Current**:\n${currentFromDate} - ${currentToDate}\n ${userStatusData.data.currentStatus.message}\n\n`;
  } else if (futureStatusState === "OOO") {
    const futureFromDate = new Date(
      userStatusData.data.futureStatus?.from
    ).toDateString();
    const futureToDate = new Date(
      userStatusData.data.futureStatus?.until
    ).toDateString();
    msg = `**Upcoming**:\n${futureFromDate} - ${futureToDate}\n${userStatusData.data.futureStatus?.message}\n`;
  } else {
    msg = `User is currently **${currentStatusState}**`;
  }
  return msg;
}
