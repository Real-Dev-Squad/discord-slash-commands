import JSONResponse from "../../../src/utils/JsonResponse";
import { fetchRdsData } from "../../../src/utils/fetchRdsData";
import {
  overdueTaskResponse,
  onboardingUsersResponse,
} from "../../fixtures/user";

describe("fetchRdsData", () => {
  it("should return a response", async () => {
    const response = await fetchRdsData({ isOnboarding: true });
    expect(response).toBeDefined();
  });

  it("should return a response with onboarding users", async () => {
    const options = { isOnboarding: true };
    const mockResponse = onboardingUsersResponse;
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );
    const response = await fetchRdsData(options);
    expect(response).toEqual(onboardingUsersResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.realdevsquad.com/users/search?state=ONBOARDING"
    );
  });

  it("should return a response with onboarding users for 30 days", async () => {
    const mockResponse = onboardingUsersResponse;
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );
    const response = await fetchRdsData({ isOnboarding: true, days: "30" });
    expect(response).toEqual(onboardingUsersResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.realdevsquad.com/users/search?state=ONBOARDING&time=30d"
    );
  });

  it("should return a response with overdue task users", async () => {
    const mockResponse = overdueTaskResponse;
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );
    const response = await fetchRdsData({ isOverdue: true });
    expect(response).toEqual(overdueTaskResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.realdevsquad.com/users?query=filterBy:overdue_tasks"
    );
  });

  it("should return a response with overdue task users for 2 days", async () => {
    const mockResponse = overdueTaskResponse;
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );
    const response = await fetchRdsData({ isOverdue: true, days: "2" });
    expect(response).toEqual(overdueTaskResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.realdevsquad.com/users?query=filterBy:overdue_tasks+days:2"
    );
  });

  it("should throw an error", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.reject(new Error("Failed to fetch user(s)"))
      );
    try {
      await fetchRdsData({ isOnboarding: true });
    } catch (error: any) {
      expect(error.message).toEqual("Failed to fetch user(s)");
    }
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.realdevsquad.com/users/search?state=ONBOARDING"
    );
  });
});
