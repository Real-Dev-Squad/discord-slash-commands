import { sleep } from "../../../src/utils/sleep";
jest.useFakeTimers();

describe("sleep function", () => {
  afterAll(() => jest.useRealTimers());
  test("should resolve after the specified delay", async () => {
    const delay = 2000;
    const promise = sleep(delay);
    jest.advanceTimersByTime(delay);
    await expect(promise).resolves.toBeUndefined();
  });

  test("should resolve after default delay if no delay is provided", async () => {
    const promise = sleep();
    jest.advanceTimersByTime(1000);
    await expect(promise).resolves.toBeUndefined();
  });
});
