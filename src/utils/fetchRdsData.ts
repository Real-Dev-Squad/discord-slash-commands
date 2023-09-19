import { RDS_BASE_API_URL } from "../constants/urls";
import {
  UserResponseType,
  UserOverdueTaskResponseType,
} from "../typeDefinitions/rdsUser";

type OptionsType = {
  days?: string;
  isOnboarding?: boolean;
  isOverdue?: boolean;
};

async function fetchRdsData(options = {}) {
  try {
    const { days, isOnboarding, isOverdue }: OptionsType = options;
    let url = RDS_BASE_API_URL;

    if (isOnboarding) {
      url += `/users/search?state=ONBOARDING&time=${days}d`;
    } else if (isOverdue) {
      url += days
        ? `/users?query=filterBy:overdue_tasks+days:${days}`
        : `/users?query=filterBy:overdue_tasks`;
    } else {
      throw new Error("Invalid parameters. Please provide userId or days.");
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch user(s)");
    }

    if (isOnboarding) {
      const responseData: UserResponseType = await response.json();
      return responseData;
    } else if (isOverdue) {
      const responseData: UserOverdueTaskResponseType = await response.json();
      return responseData;
    }
  } catch (error) {
    console.error("An error occurred while fetching user(s):", error);
    throw error;
  }
}

export { fetchRdsData };
