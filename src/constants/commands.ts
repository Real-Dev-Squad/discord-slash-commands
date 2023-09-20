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

export const TASK = {
  name: "task",
  description: "display the task of the user",
  options: [
    {
      name: "username",
      description: "Nickname of the user",
      type: 6,
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

export const USER = {
  name: "user",
  description: "Replies with specific user details in the channel",
  options: [
    {
      name: "username",
      description: "Takes username and shows user details",
      type: 6,
      required: true,
    },
  ],
};

export const NOTIFY = {
  name: "notify",
  description: "notify the user",
  options: [
    {
      name: "type",
      description: "type of notification",
      type: 3,
      required: true,
      choices: [
        {
          name: "OVERDUE",
          value: "OVERDUE",
        },
        {
          name: "ONBOARDING",
          value: "ONBOARDING",
        },
      ],
    },
    {
      name: "days",
      description: "number of days",
      type: 4,
      required: false,
      options: [
        {
          name: "days",
          description: "number of days",
          type: 4,
          required: true,
        },
      ],
    },
  ],
};
