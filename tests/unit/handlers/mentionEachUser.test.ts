import { mentionEachUser } from "../../../src/controllers/mentionEachUser";
import { checkDisplayType } from "../../../src/utils/checkDisplayType";
import { filterUserByRoles } from "../../../src/utils/filterUsersByRole";
import {
  onlyRoleToBeTagged,
  transformedArgument,
  ctx,
} from "../../fixtures/fixture";

describe("Test mention each function", () => {
  it("Should be an instance of JSONResponse", () => {
    const env = {
      BOT_PUBLIC_KEY: "xyz",
      DISCORD_GUILD_ID: "123",
      DISCORD_TOKEN: "abc",
    };

    const response = mentionEachUser(transformedArgument, env, ctx);
    expect(response).toBeInstanceOf(Promise);
  });

  it("should run without displayMessageObj argument in dev mode", async () => {
    const env = {
      BOT_PUBLIC_KEY: "xyz",
      DISCORD_GUILD_ID: "123",
      DISCORD_TOKEN: "abc",
    };
    const roleId = "1118201414078976192";
    const response = mentionEachUser(
      {
        ...onlyRoleToBeTagged,
        dev: {
          name: "dev",
          type: 4,
          value: true,
        },
      },
      env,
      ctx
    );
    expect(response).toBeInstanceOf(Promise);
    const textMessage: { data: { content: string } } = await response.then(
      (res) => res.json()
    );
    expect(textMessage.data.content).toBe(
      `Sorry no user found with <@&${roleId}> role.`
    );
  });

  it("should run without displayMessageObj argument", async () => {
    const env = {
      BOT_PUBLIC_KEY: "xyz",
      DISCORD_GUILD_ID: "123",
      DISCORD_TOKEN: "abc",
    };
    const roleId = "1118201414078976192";
    const response = mentionEachUser(onlyRoleToBeTagged, env, ctx);
    expect(response).toBeInstanceOf(Promise);
    const textMessage: { data: { content: string } } = await response.then(
      (res) => res.json()
    );
    expect(textMessage.data.content).toBe(
      `Sorry no user found with <@&${roleId}> role.`
    );
  });

  it("should return users with matching roles", () => {
    const roleId = "860900892193456149";
    const optionsArray = [
      {
        roles: [
          "890520255934377985",
          "860900892193456149",
          "845302148878565406",
        ],
        user: {
          id: "282859044593598464",
        },
      },
      {
        roles: ["851059823779905548"],
        user: {
          id: "559426966151757824",
        },
      },
      {
        roles: ["860900892193456149"],
        user: {
          id: "725745030706364447",
        },
      },
    ];
    const response = filterUserByRoles(optionsArray, roleId);
    expect(response).toStrictEqual([
      "<@282859044593598464>",
      "<@725745030706364447>",
    ]);
  });

  it("should return message based on the input", () => {
    const usersWithMatchingRole = [
      "<@282859044593598464>",
      "<@725745030706364447>",
    ];
    const msgToBeSent = "hello";
    const response = checkDisplayType({ usersWithMatchingRole, msgToBeSent });
    const expectedResponse = `${msgToBeSent} ${usersWithMatchingRole}`;
    expect(response).toBe(expectedResponse);
  });

  it("should return default string", () => {
    const roleId = "1118201414078976192";
    const usersWithMatchingRole: string[] = [];
    const msgToBeSent = "hello";
    const response = checkDisplayType({
      usersWithMatchingRole,
      msgToBeSent,
      roleId,
    });
    const expectedResponse = `Sorry no user found with <@&${roleId}> role.`;
    expect(response).toBe(expectedResponse);
  });

  it("should return default string ", () => {
    const usersWithMatchingRole = [
      "<@282859044593598464>",
      "<@725745030706364447>",
    ] as string[];
    const msgToBeSent = undefined;
    const response = checkDisplayType({ usersWithMatchingRole, msgToBeSent });
    const returnString = msgToBeSent ? msgToBeSent : "";
    const expectedResponse = `${returnString} ${usersWithMatchingRole}`;
    expect(response).toBe(expectedResponse);
  });

  describe("checkDisplayType", () => {
    it("should handle message with no matching users", () => {
      const usersWithMatchingRole: string[] = [];
      const roleId = "1118201414078976192";
      const msgToBeSent = "No users found:";
      const response = checkDisplayType({
        usersWithMatchingRole,
        msgToBeSent,
        roleId,
      });
      expect(response).toBe(`Sorry no user found with <@&${roleId}> role.`);
    });
  });
  it("should handle case when only one user found", () => {
    const roleId = "860900892193456149";
    const optionsArray = [
      {
        roles: [
          "890520255934377985",
          "860900892193456149",
          "845302148878565406",
        ],
        user: {
          id: "282859044593598464",
        },
      },
    ];
    const response = filterUserByRoles(optionsArray, roleId);
    const message = `The user with <@&${roleId}> role is: ${response}`;
    expect(message).toBe(
      `The user with <@&${roleId}> role is: <@${optionsArray[0].user.id}>`
    );
  });
});
