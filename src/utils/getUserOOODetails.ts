import { USER_STATUS_NOT_FOUND } from "../constants/responses";
import { RDS_BASE_API_URL } from "../constants/urls";
import { UserStatus } from "../typeDefinitions/userStatus.type";

export const getUserOOODetails = async (id: string) => {
  try {
    const userStatus = await fetch(`${RDS_BASE_API_URL}/users/status/${id}`);
    const userStatusData: UserStatus = await userStatus.json();
    return userStatusData;
  } catch (err) {
    return USER_STATUS_NOT_FOUND;
  }
};
