export function formatOOOMessage(data: object, id: string) {
  let msg = "";
  const { currentStatus, futureStatus } = data;

  if (currentStatus && currentStatus.state === "OOO") {
    const currentFromDate = new Date(currentStatus.from).toDateString();
    const currentToDate = new Date(currentStatus.until).toDateString();

    msg = msg.concat(
      `**Current**:\n${currentFromDate} - ${currentToDate}\nAttending ${currentStatus.message}\n\n`
    );
  }

  if (futureStatus && futureStatus.state === "OOO") {
    const futureFromDate = new Date(futureStatus.from).toDateString();
    const futureToDate = new Date(futureStatus.until).toDateString();

    msg = msg.concat(
      `**Upcoming**:\n${futureFromDate} - ${futureToDate}\n${futureStatus.message}\n`
    );
  }

  return msg ? msg : "No data found!";
}
