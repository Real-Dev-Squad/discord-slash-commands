import { getDiscordIds } from "../../../src/utils/getDiscordIds";
import { userBackendMock } from "../../fixtures/fixture";
import JSONResponse from "../../../src/utils/JsonResponse";
import { RDS_BASE_STAGING_API_URL } from "../../../src/constants/urls";

describe("getDiscordIds()", () => {
  test("it should return discordId of the user", async () => {
    const mockResponse = userBackendMock;
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new JSONResponse(mockResponse))
      );

    const result = await getDiscordIds([
      userBackendMock.user.id,
      userBackendMock.user.id,
      userBackendMock.user.id,
      userBackendMock.user.id,
      userBackendMock.user.id,
      userBackendMock.user.id,
    ]);
    expect(result).toEqual([
      userBackendMock.user.discordId,
      userBackendMock.user.discordId,
      userBackendMock.user.discordId,
      userBackendMock.user.discordId,
      userBackendMock.user.discordId,
      userBackendMock.user.discordId,
    ]);
    expect(global.fetch).toHaveBeenCalledWith(
      `${RDS_BASE_STAGING_API_URL}/users/userId/${userBackendMock.user.id}`
    );
    expect(global.fetch).toBeCalledTimes(6);
  });

  test("it should return internal server occurred if something goes wrong", async () => {
    jest
      .spyOn(global, "fetch")
      .mockRejectedValueOnce(new Error("Network error"));

    const result = await getDiscordIds([userBackendMock.user.id]);

    expect(result).toEqual(
      "Oops! We have encountered an internal Server Error"
    );

    expect(global.fetch).toHaveBeenCalledWith(
      `${RDS_BASE_STAGING_API_URL}/users/userId/${userBackendMock.user.id}`
    );
  });
});
