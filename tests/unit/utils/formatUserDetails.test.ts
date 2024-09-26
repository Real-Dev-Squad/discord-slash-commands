import { UserResponseType } from "../../../src/typeDefinitions/rdsUser";
import { formatUserDetails } from "../../../src/utils/formatUserDetails";
import {
  userResponse,
  userWithoutDiscordJoinedAtResponse,
} from "../../fixtures/user";
import {
  convertTimeStamp,
  convertEpochToDate,
} from "../../../src/utils/formatUserDetails";

describe("formatUserDetails function", () => {
  it("Should return a string", () => {
    const userData: UserResponseType = userResponse;
    const formattedUserDetails = formatUserDetails(userData, true);
    expect(typeof formattedUserDetails).toBe("string");
  });

  it("should format user details correctly in dev mode", () => {
    const formattedDetails = formatUserDetails(userResponse, true).trim();

    const userId = " ".repeat(30) + `**Id:** iODXB6ns8jaZB9p0XlBw`;
    const userName = " ".repeat(13) + `**Username:** johndoe`;
    const userFullName = " ".repeat(13) + `**Full Name:** John Doe`;
    const userState = " ".repeat(23) + `**State:** ACTIVE`;
    const discordJoinedAt =
      " ".repeat(4) +
      `**Joined Discord:** ${convertTimeStamp(userResponse, true)}`;
    const accountCreated = `**Account Created:** ${convertEpochToDate(
      userResponse.user.created_at
    )}`;

    const expectedFormattedDetails = `## User Details\n${userName}\n${userState}\n\n${userFullName}\n${userId}\n\n${accountCreated}\n${discordJoinedAt}`;
    expect(formattedDetails).toEqual(expectedFormattedDetails);
  });

  it("should format user details correctly when not in dev mode", () => {
    const formattedDetails = formatUserDetails(userResponse, false).trim();

    const userFullName = `**Full Name :** John Doe`;
    const userState = `**State :** ACTIVE`;
    const discordJoinedAt = `**Joined Server on :** ${convertTimeStamp(
      userResponse,
      false
    )}`;

    const expectedFormattedDetails = `## User Details\n${userFullName}\n${userState}\n${discordJoinedAt}`;
    expect(formattedDetails).toEqual(expectedFormattedDetails);
  });

  it("should return empty string if discordJoinedAt is undefined in dev mode", () => {
    const formattedDetails = formatUserDetails(
      userWithoutDiscordJoinedAtResponse,
      true
    ).trim();

    const userId = " ".repeat(30) + `**Id:** DWcTUhbC5lRXfDjZRp06`;
    const userName = " ".repeat(13) + `**Username:** johndoe`;
    const userFullName = " ".repeat(13) + `**Full Name:** John Doe`;
    const userState = " ".repeat(23) + `**State:** IDLE`;
    const discordJoinedAt =
      " ".repeat(4) +
      `**Joined Discord:** ${convertTimeStamp(
        userWithoutDiscordJoinedAtResponse,
        true
      )}`;
    const accountCreated = `**Account Created:** ${convertEpochToDate(
      userResponse.user.created_at
    )}`;

    const expectedFormattedDetails = `## User Details\n${userName}\n${userState}\n\n${userFullName}\n${userId}\n\n${accountCreated}\n${discordJoinedAt}`;
    expect(formattedDetails).toEqual(expectedFormattedDetails);
  });

  it("should return empty string if discordJoinedAt is undefined when not in dev mode", () => {
    const formattedDetails = formatUserDetails(
      userWithoutDiscordJoinedAtResponse,
      false
    ).trim();

    const userFullName = `**Full Name :** John Doe`;
    const userState = `**State :** IDLE`;
    const discordJoinedAt = `**Joined Server on :** ${convertTimeStamp(
      userWithoutDiscordJoinedAtResponse,
      false
    )}`;

    const expectedFormattedDetails = `## User Details\n${userFullName}\n${userState}\n${discordJoinedAt}`;
    expect(formattedDetails).toEqual(expectedFormattedDetails);
  });
});
