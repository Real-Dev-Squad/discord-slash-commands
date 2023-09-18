import { USER_STATUS_NOT_FOUND } from "../../../src/constants/responses";
import JSONResponse from "../../../src/utils/JsonResponse";
import { getUserOOODetails } from "../../../src/utils/getUserOOODetails";
import { userStatusMock } from "../../fixtures/fixture";

describe("Test getUserOOODetails function", () => {
  it("Should return user OOO details", async () => {
    const mockResponse = userStatusMock;
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );

    const userOOODetails = await getUserOOODetails("700953609556377202");
    expect(userOOODetails).toEqual(mockResponse);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.realdevsquad.com/users/status/700953609556377202"
    );
  });

  it("Should return USER_NOT_FOUND response on error", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.reject(new Error("Failed to fetch user OOO details"))
      );

    const userOOODetails = await getUserOOODetails("896953609556377202");
    expect(userOOODetails).toEqual(USER_STATUS_NOT_FOUND);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.realdevsquad.com/users/status/896953609556377202"
    );
  });
});
