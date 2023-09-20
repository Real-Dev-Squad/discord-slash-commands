import { RDS_BASE_API_URL } from "../constants/urls";
import {
  UserResponseType,
  UserOverdueTaskResponseType,
} from "../typeDefinitions/rdsUser";

/**
 * Fetches user(s) from RDS API based on the options provided
 * @param {Object} options - Options object
 * @param {string} options.days - Number of days
 * @param {boolean} options.isOnboarding - Whether to fetch onboarding users
 * @param {boolean} options.isOverdue - Whether to fetch overdue task users
 * @returns {Promise<UserResponseType | UserOverdueTaskResponseType>} - User(s) response
 * @throws {Error} - Error object
 */

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
      url += days
        ? `/users/search?state=ONBOARDING&time=${days}d`
        : `/users/search?state=ONBOARDING`;
    } else if (isOverdue) {
      url += days
        ? `/users?query=filterBy:overdue_tasks+days:${days}`
        : `/users?query=filterBy:overdue_tasks`;
    }
    const response = await fetch(url);

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
