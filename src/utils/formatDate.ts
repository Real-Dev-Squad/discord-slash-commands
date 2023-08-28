export function formatDate(timestamp: number) {
  const date = new Date(timestamp * 1000);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  const dateTimeString = `${day} ${month} ${year}, ${formattedHours}:${String(
    minutes
  ).padStart(2, "0")} ${ampm} IST`;
  return dateTimeString;
}
