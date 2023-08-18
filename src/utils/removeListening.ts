export const removeListening = (nick: string) => {
  const _nick = nick.replace("🎧", "");
  const separator = "-Can't Talk";
  const newNick = _nick.split(new RegExp(separator, "i"));
  return newNick[0].trim();
};
