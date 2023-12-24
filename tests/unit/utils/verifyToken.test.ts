import jwt from "@tsndr/cloudflare-worker-jwt";
import { verifyAuthToken } from "../../../src/utils/verifyAuthToken";
import {
  AUTHENTICATION_ERROR,
  INVALID_TOKEN_FORMAT,
} from "../../../src/constants/responses";

describe("verifyAuthToken", () => {
  const authToken = "validToken";
  const mockEnv = { RDS_SERVERLESS_PUBLIC_KEY: "publicKey" };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should verify a valid token successfully", async () => {
    jwt.verify = jest.fn().mockResolvedValue(true);
    const authHeader = `Bearer ${authToken}`;
    await expect(verifyAuthToken(authHeader, mockEnv)).resolves.not.toThrow();
    expect(jwt.verify).toHaveBeenCalledWith(
      authToken,
      mockEnv.RDS_SERVERLESS_PUBLIC_KEY,
      { algorithm: "RS256" }
    );
  });

  it("should throw an error for an invalid token", async () => {
    const authHeader = "Bearer invalidToken";
    jwt.verify = jest.fn().mockResolvedValue(false);
    await expect(verifyAuthToken(authHeader, mockEnv)).rejects.toThrow(
      AUTHENTICATION_ERROR
    );
  });
  it("should throw an error when Bearer is not passed", async () => {
    const authHeader = "Beaer invalidToken";
    await expect(verifyAuthToken(authHeader, mockEnv)).rejects.toThrow(
      INVALID_TOKEN_FORMAT
    );
  });

  it("should throw an error for a malformed auth header", async () => {
    const malformedHeader = "invalidformat";
    await expect(verifyAuthToken(malformedHeader, mockEnv)).rejects.toThrow(
      INVALID_TOKEN_FORMAT
    );
  });
});
