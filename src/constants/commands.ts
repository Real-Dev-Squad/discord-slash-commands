import { config } from "dotenv";

config();

export const HELLO = {
  name: "hello",
  description: "Replies with hello in the channel",
};

export const VERIFY = {
  name: "verify",
  description:
    "Generate a link with user specific token to link with RDS backend.",
  options: [
    {
      name: "dev",
      description: "Use new website for verification.",
      type: 5,
      required: false,
    },
  ],
};

export const GROUP_INVITE = {
  name: "group-invite",
  description: "Send group invite link for the user.",
  options: [
    {
      name: "name",
      description: "User to send group invite link",
      type: 6,
      required: true,
    },
    {
      name: "role",
      description: "Role you want to invite to the user",
      type: 8,
      required: true,
    },
  ],
};
export const GRANT_AWS_ACCESS = {
  name: "grant-aws-access",
  description: "This command is to grant AWS access to the discord users.",
  options: [
    {
      name: "user-name",
      description: "User to be granted the AWS access",
      type: 6, //user Id to be grant the access
      required: true,
    },
    {
      name: "aws-group-name",
      description: "AWS group name",
      type: 3,
      required: true,
      choices: [
        {
          name: "AWS read access",
          value: process.env.AWS_READ_ACCESS_GROUP_ID,
        },
      ],
    },
    {
      name: "dev",
      description: "Feature flag",
      type: 5,
      required: true,
    },
  ],
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
    {
      name: "dev",
      description: "want to tag them individually?",
      type: 5,
      require: false,
    },
    {
      name: "dev_title",
      description: "want to see extra details?",
      type: 5,
      require: false,
    },
  ],
};

export const REMOVE = {
  name: "remove",
  description: "remove user/users from the server",
  options: [
    {
      name: "role",
      description: "remove developers with specific role",
      type: 8, // User type
      required: true,
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
    {
      name: "dev",
      description: "want to see extra details?",
      type: 5,
      require: false,
    },
  ],
};

export const NOTIFY_OVERDUE = {
  name: "notify-overdue",
  description: "Notify the user about overdue tasks.",
  options: [
    {
      name: "notify-overdue",
      description: "Select the number of days",
      type: 3,
      required: true,
      choices: [
        {
          name: "Already Overdue",
          value: "0",
        },
        {
          name: "In 1 Day",
          value: "1",
        },
        {
          name: "In 2 Days",
          value: "2",
        },
      ],
    },
  ],
};

export const NOTIFY_ONBOARDING = {
  name: "notify-onboarding",
  description: "Notify the user about onboarding information.",
  options: [
    {
      name: "notify-onboarding",
      description: "Select the number of days",
      type: 3,
      required: true,
      choices: [
        {
          name: "All Onboarding Users",
          value: "0",
        },
        {
          name: "> 7 Days",
          value: "7",
        },
        {
          name: "> 31 Days",
          value: "31",
        },
      ],
    },
  ],
};

export const ONBOARDING_EXTENSION = {
  name: "onboarding-extension",
  description: "This command helps to create an onboarding extension request.",
  options: [
    {
      name: "number-of-days",
      description: "Number of days required for the extension request",
      type: 4,
      required: true,
    },
    {
      name: "reason",
      description: "Reason for the extension request",
      type: 3,
      required: true,
    },
    {
      name: "username",
      description: "Username of onboarding user",
      type: 6,
      required: false,
    },
  ],
};
