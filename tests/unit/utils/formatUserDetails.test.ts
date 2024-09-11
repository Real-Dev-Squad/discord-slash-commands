import { UserResponseType } from "../../../src/typeDefinitions/rdsUser";
import { formatUserDetails } from "../../../src/utils/formatUserDetails";
import {
  userResponse,
  userWithoutDiscordJoinedAtResponse,
} from "../../fixtures/user";
import { convertTimeStamp } from "../../../src/utils/formatUserDetails";

describe("formatUserDetails function", () => {
  it("Should return a string", () => {
    const userData: UserResponseType = userResponse;
    const formattedUserDetails = formatUserDetails(userData);
    expect(typeof formattedUserDetails).toBe("string");
  });

  it("should format user details correctly", () => {
    const formattedDetails = formatUserDetails(userResponse).trim();

    const userId = `**User Id :** iODXB6ns8jaZB9p0XlBw`;
    const userName = `**User Name :** johndoe`;
    const userFullName = `**Full Name :** John Doe`;
    const userState = `**State :** ACTIVE`;
    const discordJoinedAt = `**Joined Server on :** ${convertTimeStamp(
      userResponse
    )}`;

    const expectedFormattedDetails = `## User Details\n${userId}\n${userName}\n${userFullName}\n${userState}\n${discordJoinedAt}`;
    expect(formattedDetails).toEqual(expectedFormattedDetails);
  });

  it("should return empty string if discordJoinedAt is undefined", () => {
    const formattedDetails = formatUserDetails(
      userWithoutDiscordJoinedAtResponse
    ).trim();

    const userId = `**User Id :** DWcTUhbC5lRXfDjZRp06`;
    const userName = `**User Name :** johndoe`;
    const userFullName = `**Full Name :** John Doe`;
    const userState = `**State :** IDLE`;
    const discordJoinedAt = `**Joined Server on :** ${convertTimeStamp(
      userWithoutDiscordJoinedAtResponse
    )}`;

    const expectedFormattedDetails = `## User Details\n${userId}\n${userName}\n${userFullName}\n${userState}\n${discordJoinedAt}`;
    expect(formattedDetails).toEqual(expectedFormattedDetails);
  });
});
