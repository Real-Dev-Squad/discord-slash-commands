import { UserStatus } from "../typeDefinitions/userStatus.type";

export function formatOOOMessage(data: UserStatus) {
  let msg = "";
  const { data: userData } = data;

  if (userData.currentStatus && userData.currentStatus.state === "OOO") {
    const currentFromDate = new Date(
      userData.currentStatus.from
    ).toDateString();
    const currentToDate = new Date(userData.currentStatus.until).toDateString();

    msg = msg.concat(
      `**Current**:\n${currentFromDate} - ${currentToDate}\n ${userData.currentStatus.message}\n\n`
    );
  }

  if (userData.futureStatus && userData.futureStatus.state === "OOO") {
    const futureFromDate = new Date(userData.futureStatus.from).toDateString();
    const futureToDate = new Date(userData.futureStatus.until).toDateString();

    msg = msg.concat(
      `**Upcoming**:\n${futureFromDate} - ${futureToDate}\n${userData.futureStatus.message}\n`
    );
  }

  return msg ? msg : "No data found!";
}
