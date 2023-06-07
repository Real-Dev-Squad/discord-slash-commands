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
  name: "mention",
  description: "mention each user with this role",
  options: [
      {
          name: "list",
          description: "get user in list",
          type: 2, // 2 is type SUB_COMMAND_GROUP
          options: [
              {
                  name: "get",
                  description: "get me the role ",
                  type: 1, // 1 is type SUB_COMMAND
                  options: [
                      {
                          name: "user",
                          description: "The user to get",
                          type: 9, // 6 is type USER
                          required: true
                      },
                      {
                          name: "message",
                          description: "What message to send to user ?",
                          type: 3, // 7 is type CHANNEL
                          required: true
                      }
                  ]
              }
          ]
      },
      {
          name: "series",
          description: "get user in series",
          type: 2,
          options: [
              {
                  name: "get",
                  description: "get me the role",
                  type: 1,
                  options: [
                      {
                          name: "user",
                          description: "The user to get",
                          type: 9, // 8 is type ROLE
                          required: true
                      },
                      {
                          name: "message",
                          description: "The channel permissions to get. If omitted, the guild permissions will be returned",
                          type: 3,
                          required: true
                      }
                  ]
              }
          ]
      }
  ]
}