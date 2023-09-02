import { userStatusMock } from "../../tests/fixtures/fixture";
import * as response from "../constants/responses";
import { RDS_BASE_API_URL } from "../constants/urls";
import { formatOOOMessage } from "./formatOOOMessage";
// import { env } from "../typeDefinitions/default.types";
// import config from "../../config/config";
// import jwt from "@tsndr/cloudflare-worker-jwt";
// const OOO_STATUS = "OOO";

export const getUserOOODetails = async (id: string) => {
  try {
    const response = await fetch(`${RDS_BASE_API_URL}/users/vinit`);
    const responseData = await response.json();
    // const rt = responseData?.message;
    // console.log(responseData);

    //   const userStatus = await fetch(
    //     `${base_url}/users/status/${responseData.user.id}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${authToken}`,
    //       },
    //     }
    //   );
    //   const userStatusData = await userStatus.json();
    //   const data = userStatusData.data;
    const userResponse = formatOOOMessage(userStatusMock);
    return userResponse;
  } catch (err) {
    return response.BAD_SIGNATURE;
  }
};
