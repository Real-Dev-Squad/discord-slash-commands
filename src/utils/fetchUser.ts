import { RDS_BASE_API_URL } from "../constants/urls";
import {
  UserResponseType,
  UserType,
  userListResponseType,
} from "../typeDefinitions/rdsUser.types";

// async function fetchRdsData(
//   userId?: string,
//   days?: string,
//   isOnboarding?: boolean,
//   isOverdue?: boolean)
//   {
//   try {
//     let url = RDS_BASE_API_URL;

//     if (userId) {
//       url += `/users?id=${userId}`;
//     } else if (isOnboarding) {
//       url += `/users/search?state=ONBOARDING&time=${days}d`;
//     } else if (isOverdue) {
//       url += `/users?query=filterBy:overdue_tasks+days:${days}`;
//     } else {
//       throw new Error("Invalid parameters. Please provide userId or days.");
//     }

//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error("Failed to fetch user(s)");
//     }

//     if (userId) {
//       const responseData: UserType = await response.json();
//       return responseData;
//     } else if (isOnboarding) {
//       const responseData: UserResponseType = await response.json();
//       return responseData;
//     } else if (isOverdue) {
//       const responseData: userListResponseType = await response.json();
//       return responseData;
//     }

//   } catch (error) {
//     console.error("An error occurred while fetching user(s):", error);
//     throw error;
//   }
// }

type OptionsType = {
  userId?: string;
  days?: string;
  isOnboarding?: boolean;
  isOverdue?: boolean;
};

async function fetchRdsData(options = {}) {
  try {
    const { userId, days, isOnboarding, isOverdue }: OptionsType = options;
    let url = RDS_BASE_API_URL;

    if (userId) {
      url += `/users?id=${userId}`;
    } else if (isOnboarding) {
      url += `/users/search?state=ONBOARDING&time=${days}d`;
    } else if (isOverdue) {
      url += `/users?query=filterBy:overdue_tasks+days:${days}`;
    } else {
      throw new Error("Invalid parameters. Please provide userId or days.");
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch user(s)");
    }

    if (userId) {
      const responseData: UserType = await response.json();
      return responseData;
    } else if (isOnboarding) {
      const responseData: UserResponseType = await response.json();
      return responseData;
    } else if (isOverdue) {
      const responseData: userListResponseType = await response.json();
      return responseData;
    }
  } catch (error) {
    console.error("An error occurred while fetching user(s):", error);
    throw error;
  }
}

async function fetchRdsData2(endpoint: string) {
  try {
    const url = RDS_BASE_API_URL + endpoint;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching user(s):", error);
    throw error;
  }
}

export { fetchRdsData, fetchRdsData2 };
