import config from "../../../config/config";
import { environment } from "../../fixtures/config";
import {
  RDS_BASE_API_URL,
  RDS_BASE_DEVELOPMENT_API_URL,
  RDS_BASE_STAGING_API_URL,
} from "../../../src/constants/urls";

describe("Test config function", () => {
  it("Should return production config environment", () => {
    expect(config(environment[0]).RDS_BASE_API_URL).toBe(RDS_BASE_API_URL);
  });

  it("Should return staging config environment", () => {
    expect(config(environment[1]).RDS_BASE_API_URL).toBe(
      RDS_BASE_STAGING_API_URL
    );
  });

  it("Should return default config environment", () => {
    expect(config(environment[2]).RDS_BASE_API_URL).toBe(
      RDS_BASE_DEVELOPMENT_API_URL
    );
  });
});
