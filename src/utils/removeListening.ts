export const removeListening = (nick: string) => {
  const separator = "-listening";

  const newNick = nick.split(new RegExp(separator, "i"));
  return newNick[0].trim();
};
