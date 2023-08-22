import { removeListening } from "../../../src/utils/removeListening";

describe.only("Test the remove listening utility", () => {
  test("returns name without headphone snd cant talk text", () => {
    const ans = removeListening("🎧hello-Can't Talk");
    expect(ans).toStrictEqual("hello");
  });
});
