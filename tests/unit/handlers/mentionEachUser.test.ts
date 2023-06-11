import { mentionEachUser } from "../../../src/controllers/mentionEachUser";
import { filterUserByRoles } from "../../../src/utils/filterUsersByRole";
import { checkDisplayType } from "../../../src/utils/checkDisplayType";

describe("Test mention each function", () => {
  it("Should be an instance of JSONResponse", () => {
    const env = {
      BOT_PUBLIC_KEY: "xyz",
      DISCORD_GUILD_ID: "123",
      DISCORD_TOKEN: "abc",
    };
    const optionsArray = [
      {
        name: "user",
        type: 9,
        value: "860900892193456149",
      },
      {
        name: "message",
        type: 3,
        value: "hello",
      },
    ];

    const response = mentionEachUser(
      { displayType: "series", options: optionsArray },
      env
    );
    expect(response).toBeInstanceOf(Promise);
  });

  it("should filter users based on role", () => {
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
    const expectedResponse = ["<@282859044593598464>", "<@725745030706364447>"];
    expect(response).toStrictEqual(expectedResponse);
  });

  it("should return a message if users are not found (usersWithMatchingRole array is empty)", () => {
    const msgToBeSent = "hello";

    const response = checkDisplayType({
      displayType: "series",
      msgToBeSent,
      usersWithMatchingRole: [],
    });
    const expectedResponse = `Sorry no user found under this role.`;

    expect(response).toBe(expectedResponse);
  });

  it("should return message if displayType is list", () => {
    const msgToBeSent = "hello";

    const response = checkDisplayType({
      displayType: "list",
      msgToBeSent,
      usersWithMatchingRole: [],
    });
    const expectedResponse = `Coming soon. We are working on this feature. We feel sorry for not serving you what you expect this command to do for now.(T_T)`;

    expect(response).toBe(expectedResponse);
  });

  it("should return a message if users are found (usersWithMatchingRole array is not empty)", () => {
    const msgToBeSent = "hello";

    const response = checkDisplayType({
      displayType: "series",
      msgToBeSent,
      usersWithMatchingRole: ["<@282859044593598464>", "<@725745030706364447>"],
    });
    const expectedResponse =
      "hello <@282859044593598464>,<@725745030706364447>";

    expect(response).toBe(expectedResponse);
  });
});
