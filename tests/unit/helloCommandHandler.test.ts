import { helloCommand } from "../../src/controllers/helloCommand";
import JSONResponse from "../../src/utils/JsonResponse";

describe("Test Hello Command Handler", () => {
  it("Returns response of type JSONResponse", () => {
    const response = helloCommand(123456);
    expect(response).toBeInstanceOf(JSONResponse);
  });
});
