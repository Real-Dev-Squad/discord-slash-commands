export function formatStatusToTitleCase(status: string) {
  const words = status.split("_");
  const formattedStatus = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return formattedStatus;
}
