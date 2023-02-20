import { commandNotFound } from "../../../src/controllers/commandNotFound";
import { responseJson } from "../../../src/typeDefinitions/default.types";
import JSONResponse from "../../../src/utils/JsonResponse";

describe("Test CommandNotFound Handler", () => {
  it("Should return an instance of JSONResponse", () => {
    const response = commandNotFound();
    expect(response).toBeInstanceOf(JSONResponse);
  });
  it("Should contain text 'Command Not Found'", async () => {
    const response: responseJson = await commandNotFound().json();
    expect(response.data.content).toBe("Command Not Found");
  });
});
