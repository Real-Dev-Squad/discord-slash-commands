import {
  batchDiscordRequests,
  DISCORD_HEADERS,
} from "../../../src/utils/batchDiscordRequests";
import JSONResponse from "../../../src/utils/JsonResponse";

describe("Utils | batchDiscordRequests", () => {
  const rateLimitingHeaders = {
    [DISCORD_HEADERS.RATE_LIMIT_REMAINING]: "9",
    [DISCORD_HEADERS.RATE_LIMIT_RESET_AFTER]: "1.1", // seconds
  };

  const rateLimitExceededHeaders = {
    [DISCORD_HEADERS.RETRY_AFTER]: "1.2", // seconds
  };

  let fetchSpy: jest.SpyInstance;
  let setTimeoutSpy: jest.SpyInstance;

  beforeEach(() => {
    fetchSpy = jest.spyOn(global, "fetch");
    setTimeoutSpy = jest.spyOn(global, "setTimeout");
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  test("should execute requests when there are no headers", async () => {
    fetchSpy.mockImplementation(() =>
      Promise.resolve(new JSONResponse({}, {}))
    );
    const singleRequest = () => fetch("/abc", { method: "GET" });
    await batchDiscordRequests([singleRequest]);
    expect(global.fetch).toHaveBeenCalledWith("/abc", { method: "GET" });
    expect(global.fetch).toBeCalledTimes(1);
  });

  test("should execute multiple requests when there are no headers", async () => {
    fetchSpy.mockImplementation(() =>
      Promise.resolve(new JSONResponse({}, {}))
    );
    const singleRequest = () => fetch("/abc", { method: "GET" });
    await batchDiscordRequests(new Array(20).fill(singleRequest));
    expect(global.fetch).toHaveBeenCalledWith("/abc", { method: "GET" });
    expect(global.fetch).toBeCalledTimes(20);
  });

  test("should execute requests when there are headers and input size is 40 with a limit of 3", async () => {
    const maxRateLimit = 3;
    const inputSize = 40;
    let remainingRateLimit = maxRateLimit;
    const headers = { ...rateLimitingHeaders };
    fetchSpy.mockImplementation(
      () =>
        new Promise((resolve) => {
          headers[DISCORD_HEADERS.RATE_LIMIT_REMAINING] =
            remainingRateLimit.toString();
          remainingRateLimit--;
          return resolve(new JSONResponse({}, { headers: headers }));
        })
    );
    setTimeoutSpy.mockImplementation((resolve: any) => {
      remainingRateLimit = maxRateLimit;
      return resolve();
    });
    const singleRequest = () => fetch("/abc", { method: "GET" });
    await batchDiscordRequests(new Array(inputSize).fill(singleRequest));
    expect(global.fetch).toHaveBeenCalledWith("/abc", { method: "GET" });
    expect(global.fetch).toBeCalledTimes(inputSize);
  });

  test("should execute requests when there are headers and input size is 6 with a limit of 2", async () => {
    const maxRateLimit = 3;
    const inputSize = 6;
    let remainingRateLimit = maxRateLimit;
    const headers = { ...rateLimitingHeaders };
    fetchSpy.mockImplementation(
      () =>
        new Promise((resolve) => {
          headers[DISCORD_HEADERS.RATE_LIMIT_REMAINING] =
            remainingRateLimit.toString();
          remainingRateLimit--;
          return resolve(new JSONResponse({}, { headers: headers }));
        })
    );
    setTimeoutSpy.mockImplementation((resolve: any) => {
      remainingRateLimit = maxRateLimit;
      return resolve();
    });
    const singleRequest = () => fetch("/abc", { method: "GET" });
    await batchDiscordRequests(new Array(inputSize).fill(singleRequest));
    expect(global.fetch).toHaveBeenCalledWith("/abc", { method: "GET" });
    expect(global.fetch).toBeCalledTimes(inputSize);
  });

  test("should retry fetch call when the API fails", async () => {
    const headers = { ...rateLimitExceededHeaders };
    fetchSpy.mockImplementation(
      () =>
        new Promise((resolve) => {
          return resolve(
            new JSONResponse({}, { headers: headers, status: 500 })
          );
        })
    );
    setTimeoutSpy.mockImplementation((resolve: any) => {
      return resolve();
    });
    const singleRequest = () => fetch("/abc", { method: "GET" });
    await batchDiscordRequests([singleRequest]);
    expect(global.fetch).toHaveBeenCalledWith("/abc", { method: "GET" });
    expect(global.fetch).toBeCalledTimes(2);
  });

  test("should retry only failed fetch calls", async () => {
    const maxRateLimit = 3;
    const inputSize = 6;
    let remainingRateLimit = maxRateLimit;
    let retries = 5;
    const headers = { ...rateLimitingHeaders };
    fetchSpy.mockImplementation(
      () =>
        new Promise((resolve) => {
          const status = retries > 0 ? 500 : 200;
          retries--;
          headers[DISCORD_HEADERS.RATE_LIMIT_REMAINING] =
            remainingRateLimit.toString();
          remainingRateLimit--;
          return resolve(
            new JSONResponse({}, { headers: headers, status: status })
          );
        })
    );
    setTimeoutSpy.mockImplementation((resolve: any) => {
      remainingRateLimit = maxRateLimit;
      return resolve();
    });
    const singleRequest = () => fetch("/abc", { method: "GET" });
    await batchDiscordRequests(new Array(inputSize).fill(singleRequest));
    expect(global.fetch).toHaveBeenCalledWith("/abc", { method: "GET" });
    expect(global.fetch).toBeCalledTimes(inputSize + 3);
  });
  test("should retry only failed fetch calls", async () => {
    const maxRateLimit = 3;
    const inputSize = 6;
    let remainingRateLimit = maxRateLimit;
    let retries = 5;
    const headers = { ...rateLimitingHeaders };
    fetchSpy.mockImplementation(
      () =>
        new Promise((resolve) => {
          const status = retries > 0 ? 500 : 200;
          retries--;
          headers[DISCORD_HEADERS.RATE_LIMIT_REMAINING] =
            remainingRateLimit.toString();
          remainingRateLimit--;
          return resolve(
            new JSONResponse({}, { headers: headers, status: status })
          );
        })
    );
    setTimeoutSpy.mockImplementation((resolve: any) => {
      remainingRateLimit = maxRateLimit;
      return resolve();
    });
    const singleRequest = () => fetch("/abc", { method: "GET" });
    await batchDiscordRequests(new Array(inputSize).fill(singleRequest));
    expect(global.fetch).toHaveBeenCalledWith("/abc", { method: "GET" });
    expect(global.fetch).toBeCalledTimes(inputSize + 3);
  });

  test("should retry even for the rate limited exceeded headers", async () => {
    const inputSize = 4;
    const headers = { ...rateLimitExceededHeaders };
    fetchSpy.mockImplementation(
      () =>
        new Promise((resolve) => {
          return resolve(
            new JSONResponse({}, { headers: headers, status: 500 })
          );
        })
    );
    setTimeoutSpy.mockImplementation((resolve: any) => {
      return resolve();
    });
    const singleRequest = () => fetch("/abc", { method: "GET" });
    await batchDiscordRequests(new Array(inputSize).fill(singleRequest));
    expect(global.fetch).toHaveBeenCalledWith("/abc", { method: "GET" });
    expect(global.fetch).toBeCalledTimes(inputSize * 2);
  });
  test("should handle network errors and continue processing", async () => {
    const inputSize = 3;
    fetchSpy.mockImplementation(() => Promise.reject("Network error"));
    const singleRequest = () => fetch("/abc", { method: "GET" });
    await batchDiscordRequests(new Array(inputSize).fill(singleRequest));
    expect(global.fetch).toHaveBeenCalledWith("/abc", { method: "GET" });
    expect(global.fetch).toBeCalledTimes(inputSize * 2);
  });
});
