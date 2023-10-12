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

    const userFullName = `**Full Name :** Sunny Sahsi`;
    const discordJoinedAt = `**RDS Discord Joined at :** ${convertTimeStamp(
      userResponse
    )}`;
    const userState = `**State :** ACTIVE`;

    const expectedFormattedDetails = `## User Details\n${userFullName}\n${discordJoinedAt}\n${userState}`;
    expect(formattedDetails).toEqual(expectedFormattedDetails);
  });

  it("should return empty string if discordJoinedAt is undefined", () => {
    const formattedDetails = formatUserDetails(
      userWithoutDiscordJoinedAtResponse
    ).trim();
    const userFullName = `**Full Name :** Jyotsna Mehta`;
    const discordJoinedAt = `**RDS Discord Joined at :** ${convertTimeStamp(
      userWithoutDiscordJoinedAtResponse
    )}`;
    const userState = `**State :** IDLE`;
    const expectedFormattedDetails = `## User Details\n${userFullName}\n${discordJoinedAt}\n${userState}`;
    expect(formattedDetails).toEqual(expectedFormattedDetails);
  });
});
