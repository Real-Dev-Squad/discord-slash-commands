// import { formatUserDetails } from "../../../src/utils/formatUserDetails";
import { userBackendMock } from "../../fixtures/fixture";

describe.skip("formatUserDetails function", () => {
  it("should format user details correctly", () => {
    // const formattedDetails = formatUserDetails(userBackendMock).trim();
    const expectedFormattedDetails = `
        ## User Details
        **Full Name :** Jane Doe
        **RDS Discord Joined At :** 17/06/2023 02:50:03
        **State :** IDLE
      `.trim();
    // expect(formattedDetails).toEqual(expectedFormattedDetails);
  });
});
