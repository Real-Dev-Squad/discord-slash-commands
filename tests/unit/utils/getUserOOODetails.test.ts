import * as responses from "../../../src/constants/responses";
import { getUserOOODetails } from "../../../src/utils/getUserOOODetails";
import { formatOOOMessage } from "../../../src/utils/formatOOOMessage";

global.fetch = jest.fn();

describe("getUserOOODetails", () => {
  it("returns BAD_SIGNATURE on API error", async () => {
    const id = "someUserId";

    // Mock the fetch function to simulate an API error
    jest.spyOn(global, "fetch").mockRejectedValue(new Error("API error"));

    // Call the getUserOOODetails function
    const result = await getUserOOODetails(id);

    // Verify that it returns BAD_SIGNATURE on API error
    expect(result).toEqual(responses.BAD_SIGNATURE);
  });
});
