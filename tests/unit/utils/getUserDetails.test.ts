import JSONResponse from "../../../src/utils/JsonResponse";
import { getUserDetails } from "../../../src/utils/getUserDetails";
import { userResponse, userNotFoundResponse } from "../../fixtures/user";

describe("Test getUserDetails function", () => {
  const discordID = "1234567890";
  it("Should return a response", async () => {
    const userResponse = await getUserDetails(discordID);
    expect(userResponse).toBeDefined();
  });

  it("Should return a response with user details", async () => {
    const mockResponse = userResponse;
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );
    const user = await getUserDetails(discordID);
    expect(userResponse).toEqual(user);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.realdevsquad.com/users?discordId=1234567890&dev=true"
    );
  });

  it("Should return a response with no tasks", async () => {
    const mockResponse = userNotFoundResponse;
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse, { status: 400 }))
      );
    const user = await getUserDetails(discordID);
    expect(user).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.realdevsquad.com/users?discordId=1234567890&dev=true"
    );
  });

  it("Should throw an error", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.reject(new Error("An error occurred")));
    await expect(getUserDetails(discordID)).rejects.toThrow(
      "An error occurred"
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.realdevsquad.com/users?discordId=1234567890&dev=true"
    );
  });

  it("Should include state property", async () => {
    const mockResponse = userResponse;
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );
    const user = await getUserDetails(discordID);
    expect(userResponse.user).toHaveProperty("state");
  });
});
