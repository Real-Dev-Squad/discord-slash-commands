import { UserResponseType } from "../../../src/typeDefinitions/rdsUser";
import { formatUserDetails } from "../../../src/utils/formatUserDetails";
import { userResponse } from "../../fixtures/user";
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
    console.log(formattedDetails);
    console.log(expectedFormattedDetails);
    expect(formattedDetails).toEqual(expectedFormattedDetails);
  });
});
