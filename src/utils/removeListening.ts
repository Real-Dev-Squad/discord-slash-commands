import { LISTENING_COPY } from "../constants/copy";

export const removeListening = (nick: string) => {
  const emojiRemovedNick = nick.replace("🎧", "");
  const separator = LISTENING_COPY;
  const newNick = emojiRemovedNick.split(new RegExp(separator, "i"));
  return newNick[0].trim();
};
