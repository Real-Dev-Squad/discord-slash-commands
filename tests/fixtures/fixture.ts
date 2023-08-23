import { IRequest } from "itty-router";
import {
  createNewRole,
  discordMessageRequest,
  memberGroupRole,
} from "../../src/typeDefinitions/discordMessage.types";
import { InteractionType } from "discord-interactions";
import { UserBackend } from "../../src/typeDefinitions/userBackend.types";
import { TaskOverdueResponse } from "../../src/typeDefinitions/taskOverdue.types";

export const dummyHelloMessage: discordMessageRequest = {
  type: InteractionType.APPLICATION_COMMAND,
  data: {
    name: "Hello",
  },
  member: {
    user: {
      id: 123456,
      username: "ritik",
      avatar: "d1eaa8f8ab5e8235e08e659aef5dfeac",
      discriminator: "1234",
    },
  },
  guild_id: 123456,
};

export const dummyVerifyMessage: discordMessageRequest = {
  type: InteractionType.APPLICATION_COMMAND,
  data: {
    name: "VERIFY",
  },
  member: {
    user: {
      id: 123456,
      username: "ritik",
      avatar: "d1eaa8f8ab5e8235e08e659aef5dfeac",
      discriminator: "1234",
    },
  },
  guild_id: 123456,
};

export const dummyCreateBody: createNewRole = {
  rolename: "test role",
  mentionable: true,
};

export const dummyAddRoleBody: memberGroupRole = {
  userid: "abcd1234",
  roleid: "defg5678",
};

export const guildEnv = {
  DISCORD_GUILD_ID: "1234",
  DISCORD_TOKEN: "abcd",
};

export const dummyGuildMemberDetails = {
  avatar: null,
  communication_disabled_until: null,
  flags: 0,
  joined_at: "2023-04-01T01:00:09.204000+00:00",
  nick: null,
  pending: false,
  premium_since: null,
  roles: [],
  user: {
    id: "12345678",
    username: "John Doe",
    avatar: "123abc123xyz",
    discriminator: "6818",
    public_flags: 64,
    flags: 64,
    banner: null,
    accent_color: 16721920,
    global_name: null,
    avatar_decoration: null,
    display_name: null,
    banner_color: "#ff2800",
  },
  mute: false,
  deaf: false,
};

export const transformedArgument = {
  roleToBeTaggedObj: {
    name: "role",
    type: 8,
    value: "1118201414078976192",
  },
  displayMessageObj: { name: "message", type: 3, value: "hello" },
};

export const onlyRoleToBeTagged = {
  roleToBeTaggedObj: {
    name: "role",
    type: 8,
    value: "1118201414078976192",
  },
};

export const generateDummyRequestObject = ({
  url,
  method,
  params,
  query,
  headers, // Object of key value pair
}: Partial<IRequest>): IRequest => {
  return {
    method: method ?? "GET",
    url: url ?? "/roles",
    params: params ?? {},
    query: query ?? {},
    headers: new Map(Object.entries(headers ?? {})),
  };
};

export const rolesMock = [
  {
    id: "1234567889",
    name: "@everyone",
    permissions: "",
    position: 2,
    color: 2,
    hoist: true,
    managed: true,
    mentionable: true,
  },
  {
    id: "12344567",
    name: "bot one",
    permissions: "",
    position: 2,
    color: 2,
    hoist: true,
    managed: true,
    mentionable: true,
  },
];
export const mockDateNow = 1626512345678;
export const UNIQUE_TOKEN = "UNIQUE_TOKEN";
export const env = {
  BOT_PUBLIC_KEY: "BOT_PUBLIC_KEY",
  DISCORD_GUILD_ID: "DISCORD_GUILD_ID",
  DISCORD_TOKEN: "SIGNED_JWT",
};

export const discordUserData = {
  type: "discord",
  token: UNIQUE_TOKEN,
  attributes: {
    discordId: 1,
    userAvatar: "https://cdn.discordapp.com/avatars/1/userAvatarHash.jpg",
    userName: "userName",
    discriminator: "discriminator",
    expiry: mockDateNow + 1000 * 60 * 2,
  },
};

export const userBackendMock: UserBackend = {
  message: "User returned successfully",
  user: {
    id: "1234567",
    username: "fmk",
    first_name: "f",
    last_name: "mk",
    discordId: "12345",
    github_display_name: "fmk",
    github_id: "fmk23",
    isMember: false,
  },
};

export const taskOverdueMock: TaskOverdueResponse = {
  message: "Tasks returned Successfully",
  tasks: [
    {
      id: "1234567",
      percentCompleted: 60,
      endsOn: "1686528000",
      isNoteworthy: false,
      createdBy: "random",
      assignee: "vineeeet",
      title: "task dependsOn",
      type: "feature",
      status: "SMOKE_TESTING",
      assigneeId: "12345",
      dependsOn: [
        "1NtgKz4lzyiGMHSyBWje",
        " HdRj3T603v0L5Pn80GUq",
        " C29GgTuPWK32UqcyImsA",
      ],
      startedOn: "1686527000",
    },
  ],
};
