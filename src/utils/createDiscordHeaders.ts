const createDiscordHeaders = ({
  reson,
  token,
}: {
  reson?: string;
  token: string;
}) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bot ${token}`,
  };
  if (reson) {
    headers["X-Audit-Log-Reason"] = reson;
  }
  return headers;
};
export default createDiscordHeaders;
