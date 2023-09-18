import { UserResponseType } from "../../../src/typeDefinitions/rdsUser";
import { formatUserDetails } from "../../../src/utils/formatUserDetails";
import { userResponse } from "../../fixtures/user";
import { userBackendMock } from "../../fixtures/fixture";

describe.only("formatUserDetails function", () => {
  it("Should return a string", () => {
    const userData: UserResponseType = userResponse;
    const formattedUserDetails = formatUserDetails(userData);
    expect(typeof formattedUserDetails).toBe("string");
  });

  it("should format user details correctly", () => {
    const formattedDetails = formatUserDetails(userResponse).trim();
    const expectedFormattedDetails = `
          ## User Details
          **Full Name :** Sunny Sahsi
          **RDS Discord Joined At :** 08/08/2023 17:10:42
          **State :** ACTIVE
        `.trim();
    expect(formattedDetails).toEqual(expectedFormattedDetails);
  });
});
