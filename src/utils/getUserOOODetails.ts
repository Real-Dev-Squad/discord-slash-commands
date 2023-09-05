// import { userStatusMock } from "../../tests/fixtures/fixture";
import * as response from "../constants/responses";
import { RDS_BASE_API_URL } from "../constants/urls";
import { User } from "../typeDefinitions/user.types";
import { formatOOOMessage } from "./formatOOOMessage";

export const getUserOOODetails = async (id: string) => {
  try {
    const response = await fetch(`${RDS_BASE_API_URL}/users/vinit`);
    const responseData: User = await response.json();
    const userId = responseData?.user?.id;
    if (userId) {
      const userStatus = await fetch(
        `${RDS_BASE_API_URL}/users/status/${userId}`
      );
      const userStatusData: any = await userStatus.json();
      const userResponse = formatOOOMessage(userStatusData);
      return userResponse;
    }
  } catch (err) {
    return response.BAD_SIGNATURE;
  }
};
