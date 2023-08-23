import { NICKNAME_SUFFIX } from "../constants/nicknameAffixes";

export const removeListening = (nickName: string) => {
  const emojiRemovedNick = nickName.replace("🎧", "");
  const separator = NICKNAME_SUFFIX;
  const newNick = emojiRemovedNick.split(new RegExp(separator, "i"));
  return newNick[0].trim();
};
