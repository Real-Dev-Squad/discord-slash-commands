import JSONResponse from "../../../src/utils/JsonResponse";
import { fetchTasks } from "../../../src/utils/fetchTasks";
import { tasksResponse } from "../../fixtures/tasks";

describe.skip("Test fetchTasks function", () => {
  it("Should return a response", async () => {
    const tasks = await fetchTasks("sunny-s", "IN_PROGRESS");
    expect(tasks).toBeDefined();
  });

  it("Should return a response with tasks", async () => {
    const mockResponse = tasksResponse;
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );
    const tasks = await fetchTasks("sunny-s", "IN_PROGRESS");
    expect(tasks).toEqual(tasksResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.realdevsquad.com/tasks?status=IN_PROGRESS&assignee=sunny-s&dev=true"
    );
  });

  it("Should throw an error if response is not ok", async () => {
    const mockResponse = {
      message: "Failed to fetch tasks for **sunny-s**.",
    };
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse, { status: 400 }))
      );
    await expect(fetchTasks("sunny-s", "IN_PROGRESS")).rejects.toThrow(
      "Failed to fetch tasks for **sunny-s**."
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.realdevsquad.com/tasks?status=IN_PROGRESS&assignee=sunny-s&dev=true"
    );
  });

  it("Should return a response with no tasks", async () => {
    const mockResponse = {
      tasks: [],
    };
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );
    const tasks = await fetchTasks("sunny-s", "IN_PROGRESS");
    expect(tasks).toEqual(mockResponse);
    expect(tasks.tasks.length).toEqual(0);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.realdevsquad.com/tasks?status=IN_PROGRESS&assignee=sunny-s&dev=true"
    );
  });
});
