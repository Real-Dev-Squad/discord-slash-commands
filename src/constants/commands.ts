export const HELLO = {
  name: "hello",
  description: "Replies with hello in the channel",
};

export const VERIFY = {
  name: "verify",
  description:
    "Generate a link with user specific token to link with RDS backend.",
};

export const MENTION_EACH = {
  name: "mention-each",
  description: "mention each user with this role",
  options: [
    {
      name: "role",
      description: "to be tagged in the message",
      type: 8, // 2 is type SUB_COMMAND_GROUP
      required: true,
    },
    {
      name: "message",
      description: "any message for them?",
      type: 3,
      require: false,
    },
  ],
};

export const LISTENING = {
  name: "listening",
  description: "mark user as listening",
  options: [
    {
      name: "value",
      description: "to enable or disable the listening mode",
      type: 5, // 2 is type SUB_COMMAND_GROUP
      required: true,
    },
  ],
};

export const OOO = {
  name: "ooo",
  description: "out-of-office data of the mentioned user",
  options: [
    {
      name: "username",
      description: "tag user for that",
      type: 6,
      required: true,
    },
  ],
};

export const TASK = {
  name: "ooo",
  description: "display the ooo status",
  options: [
    {
      name: "username",
      description: "Nickname of the user",
      type: 6,
      required: true,
    },
  ],
};
