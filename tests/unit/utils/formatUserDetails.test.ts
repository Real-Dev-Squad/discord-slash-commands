import { formatUserDetails } from "../../../src/utils/formatUserDetails";

describe("formatUserDetails function", () => {
  it("should format user details correctly", () => {
    const user = JSON.stringify({
      user: {
        first_name: "John",
        last_name: "Doe",
        discordJoinedAt: "2023-09-13T09:30:00.000Z",
        state: "Active",
      },
    });

    const formattedDetails = formatUserDetails(user).trim();
    const expectedFormattedDetails = `
        ## User Details  
        **Full Name :** John Doe 
        **RDS Discord Joined At :** 13 September 2023, 9:30 AM IST
        **State :** Active
      `.trim();
    expect(formattedDetails).toEqual(expectedFormattedDetails);
  });
});
