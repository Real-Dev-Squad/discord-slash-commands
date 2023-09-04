import * as responses from "../../../src/constants/responses";
import { getUserOOODetails } from "../../../src/utils/getUserOOODetails";
// import { formatOOOMessage } from "../../../src/utils/formatOOOMessage";

global.fetch = jest.fn();

describe("getUserOOODetails", () => {
  it("returns BAD_SIGNATURE on API error", async () => {
    const id = "someUserId";
    jest.spyOn(global, "fetch").mockRejectedValue(new Error("API error"));
    const result = await getUserOOODetails(id);
    expect(result).toEqual(responses.BAD_SIGNATURE);
  });
});
