import { RDS_BASE_API_URL } from "../constants/urls";
import {
  UserType,
  UserResponseType,
  UserListResponseType,
} from "../typeDefinitions/rdsUser";

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
      const responseData: UserListResponseType = await response.json();
      return responseData;
    }
  } catch (error) {
    console.error("An error occurred while fetching user(s):", error);
    throw error;
  }
}

export { fetchRdsData };
