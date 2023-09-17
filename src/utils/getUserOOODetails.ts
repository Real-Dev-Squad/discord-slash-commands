import * as response from "../constants/responses";
import { RDS_BASE_API_URL, RDS_BASE_STAGING_API_URL } from "../constants/urls";
import { User } from "../typeDefinitions/user.types";
import { UserStatus } from "../typeDefinitions/userStatus.type";

export const getUserOOODetails = async (id: string) => {
  try {
    const response = await fetch(
      `${RDS_BASE_STAGING_API_URL}/users/?discordId=${id}&dev=true`
    );
    const responseData: User = await response.json();
    const userId = responseData?.user?.id;
    if (userId) {
      const userStatus = await fetch(
        `${RDS_BASE_STAGING_API_URL}/users/status/${userId}`
      );
      const userStatusData: UserStatus = await userStatus.json();
      return userStatusData;
    }
  } catch (err) {
    return response.BAD_SIGNATURE;
  }
};
