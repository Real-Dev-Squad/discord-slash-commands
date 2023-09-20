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
    console.log(formattedDetails);
    const expectedFormattedDetails = `
          ## User Details
          **Full Name :** Sunny Sahsi
          **RDS Discord Joined At :** ${convertTimeStamp(userResponse)}
          **State :** ACTIVE
        `.trim();
    expect(formattedDetails).toEqual(expectedFormattedDetails);
  });
});
