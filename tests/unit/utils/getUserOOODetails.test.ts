import JSONResponse from "../../../src/utils/JsonResponse";
import { getUserOOODetails } from "../../../src/utils/getUserOOODetails";
import { userStatusMock } from "../../fixtures/fixture";

describe("Test getUserOOODetails function", () => {
  it("Should return a response", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(userStatusMock))
      );
    const userOOODetails = await getUserOOODetails("discordId");
    expect(userOOODetails).toBeDefined();
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.realdevsquad.com/users/?discordId=discordId&dev=true"
    );
  });

  it("Should return user OOO details", async () => {
    const mockResponse = userStatusMock;
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );

    const userOOODetails = await getUserOOODetails("discordId");
    expect(userOOODetails).toEqual(mockResponse);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.realdevsquad.com/users/?discordId=discordId&dev=true"
    );
  });

  it.skip("Should return BAD_SIGNATURE response on error", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.reject(new Error("Failed to fetch user OOO details"))
      );

    const userOOODetails = await getUserOOODetails("discordId");
    expect(userOOODetails).toEqual(response.BAD_SIGNATURE);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.realdevsquad.com/users/?discordId=discordId&dev=true"
    );
  });
});
