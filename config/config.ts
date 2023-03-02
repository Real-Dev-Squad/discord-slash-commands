import { env } from "../src/typeDefinitions/default.types";
import {
  RDS_BASE_API_URL,
  RDS_BASE_STAGING_API_URL,
  RDS_BASE_DEVELOPMENT_API_URL,
} from "../src/constants/urls";

const config = (env: env) => {
  const environment = { RDS_BASE_API_URL: "" };

  switch (env.CURRENT_ENVIRONMENT) {
    case "production":
      environment.RDS_BASE_API_URL = RDS_BASE_API_URL;
      break;

    case "staging":
      environment.RDS_BASE_API_URL = RDS_BASE_STAGING_API_URL;
      break;

    default:
      environment.RDS_BASE_API_URL = RDS_BASE_DEVELOPMENT_API_URL;
  }

  return environment;
};

export default config;
