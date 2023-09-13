import { formatUserDetails } from "../../../src/utils/formatUserDetails";
import { formatDate } from "../../../src/utils/formatDate";

describe("formatUserDetails", () => {
  it("formats user details correctly", () => {
    const user = JSON.stringify({
      user: {
        first_name: "John",
        last_name: "Doe",
        discordJoinedAt: "2023-09-13T12:00:00.000Z",
        state: "Active",
      },
    });

    const expectedOutput = `
        ## User Details  
        **Full Name :** John Doe 
        **RDS Discord Joined At :** ${formatDate(1699992000)}
        **State :** Active
      `;

    const result = formatUserDetails(user);

    expect(result).toEqual(expectedOutput);
  });

  it("handles invalid user data", () => {
    const invalidUserData = "{invalid_json}";

    const expectedOutput = `
        ## User Details  
        **Full Name :** undefined undefined 
        **RDS Discord Joined At :** Invalid Date
        **State :** undefined
      `;

    const result = formatUserDetails(invalidUserData);

    expect(result).toEqual(expectedOutput);
  });
});
