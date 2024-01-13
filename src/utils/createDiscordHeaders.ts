const createDiscordHeaders = ({
  reason,
  token,
}: {
  reason?: string;
  token: string;
}) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bot ${token}`,
  };
  if (reason) {
    headers["X-Audit-Log-Reason"] = reason;
  }
  return headers;
};
export default createDiscordHeaders;
