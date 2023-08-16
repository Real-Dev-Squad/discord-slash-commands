import { mentionEachUser } from "../../../src/controllers/mentionEachUser";
import { checkDisplayType } from "../../../src/utils/checkDisplayType";
import { filterUserByRoles } from "../../../src/utils/filterUsersByRole";
import {
  onlyRoleToBeTagged,
  transformedArgument,
} from "../../fixtures/fixture";

describe("Test mention each function", () => {
  it("Should be an instance of JSONResponse", () => {
    const env = {
      BOT_PUBLIC_KEY: "xyz",
      DISCORD_GUILD_ID: "123",
      DISCORD_TOKEN: "abc",
    };

    const response = mentionEachUser(transformedArgument, env);
    expect(response).toBeInstanceOf(Promise);
  });

  it("should run without displayMessageObj argument", () => {
    const env = {
      BOT_PUBLIC_KEY: "xyz",
      DISCORD_GUILD_ID: "123",
      DISCORD_TOKEN: "abc",
    };

    const response = mentionEachUser(onlyRoleToBeTagged, env);
    expect(response).toBeInstanceOf(Promise);
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
    const response = checkDisplayType({ usersWithMatchingRole });
    const expectedResponse = `${usersWithMatchingRole}`;
    expect(response).toBe(expectedResponse);
  });

  it("should return default string ", () => {
    const usersWithMatchingRole = [] as string[];
    const response = checkDisplayType({ usersWithMatchingRole });
    const expectedResponse = `Sorry no user found under this role.`;
    expect(response).toBe(expectedResponse);
  });

  it("should return default string ", () => {
    const usersWithMatchingRole = [
      "<@282859044593598464>",
      "<@725745030706364447>",
    ] as string[];
    const response = checkDisplayType({ usersWithMatchingRole });
    const expectedResponse = `${usersWithMatchingRole}`;
    expect(response).toBe(expectedResponse);
  });
});
