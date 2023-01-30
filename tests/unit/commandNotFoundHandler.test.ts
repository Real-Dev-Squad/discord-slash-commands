import { commandNotFound } from "../../src/controllers/commandNotFound";
import JSONResponse from "../../src/utils/JsonResponse";

describe("Test Command Not Found Handler", () => {
  it("Returns JSONResponse for unknown commands", () => {
    expect(commandNotFound()).toBeInstanceOf(JSONResponse);
  });
});
