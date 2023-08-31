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
    const userobject = {
      userId: "String",
      // "currentStatus":  {
      //     "state": "OOO",
      //     "updatedAt": 1693314367311,
      //     "from": 1680912000000,
      //     "until": 1703980800000,
      //     "message": "react conference"
      //   },
      futureStatus: {
        state: "OOO",
        updatedAt: 1693314367311,
        from: 1693267200000,
        until: 1693785600000,
        message: "Going to bahamas",
      },
    };
    const userResponse = formatOOOMessage(userobject, id);
    return userResponse;
  } catch (err) {
    return response.BAD_SIGNATURE;
  }
};
