import { NICKNAME_SUFFIX } from "../constants/messagingConstants";

export const removeListening = (nick: string) => {
  const emojiRemovedNick = nick.replace("🎧", "");
  const separator = NICKNAME_SUFFIX;
  const newNick = emojiRemovedNick.split(new RegExp(separator, "i"));
  return newNick[0].trim();
};
