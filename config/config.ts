import { env, environment } from "../src/typeDefinitions/default.types";
import {
  RDS_BASE_API_URL,
  RDS_BASE_STAGING_API_URL,
  RDS_BASE_DEVELOPMENT_API_URL,
  VERIFICATION_SITE_URL,
  STAGING_VERIFICATION_SITE_URL,
  DEVELOPMENT_VERIFICATION_SITE_URL,
  RDS_TRACKING_CHANNEL_URL,
  DEVELOPMENT_RDS_TRACKING_CHANNEL_URL,
  STAGING_RDS_TRACKING_CHANNEL_URL,
  RDS_STATUS_SITE_URL,
  RDS_STAGING_STATUS_SITE_URL,
  RDS_DASHBOARD_SITE_URL,
  RDS_STAGING_DASHBOARD_SITE_URL,
} from "../src/constants/urls";
import {
  DISCORD_PROFILE_SERVICE_HELP_GROUP,
  DISCORD_PROFILE_SERVICE_STAGING_HELP_GROUP,
  DISCORD_PROFILE_SERVICE_DEVELOPMENT_HELP_GROUP,
} from "../src/constants/variables";
import { config as configFromDotEnv } from "dotenv";

export function loadEnv(env: env, fromWorkerEnv: boolean): env {
  const Env: env = {
    CURRENT_ENVIRONMENT: fromWorkerEnv
      ? env.CURRENT_ENVIRONMENT
      : process.env.CURRENT_ENVIRONMENT || "",
    DISCORD_APPLICATION_ID: fromWorkerEnv
      ? env.DISCORD_APPLICATION_ID
      : process.env.DISCORD_APPLICATION_ID || "",
    DISCORD_GUILD_ID: fromWorkerEnv
      ? env.DISCORD_GUILD_ID
      : process.env.DISCORD_GUILD_ID || "",
    DISCORD_TOKEN: fromWorkerEnv
      ? env.DISCORD_TOKEN
      : process.env.DISCORD_TOKEN || "",
    DISCORD_PUBLIC_KEY: fromWorkerEnv
      ? env.DISCORD_PUBLIC_KEY
      : process.env.DISCORD_PUBLIC_KEY || "",
    CLOUDFLARE_API_TOKEN: fromWorkerEnv
      ? env.CLOUDFLARE_API_TOKEN
      : process.env.CLOUDFLARE_API_TOKEN || "",
    CLOUDFLARE_ACCOUNT_ID: fromWorkerEnv
      ? env.CLOUDFLARE_ACCOUNT_ID
      : process.env.CLOUDFLARE_ACCOUNT_ID || "",
    BOT_PRIVATE_KEY: fromWorkerEnv
      ? env.BOT_PRIVATE_KEY
      : process.env.BOT_PRIVATE_KEY || "",
    RDS_SERVERLESS_PUBLIC_KEY: fromWorkerEnv
      ? env.RDS_SERVERLESS_PUBLIC_KEY
      : process.env.RDS_SERVERLESS_PUBLIC_KEY || "",
    CRON_JOBS_PUBLIC_KEY: fromWorkerEnv
      ? env.CRON_JOBS_PUBLIC_KEY
      : process.env.CRON_JOBS_PUBLIC_KEY || "",
    IDENTITY_SERVICE_PUBLIC_KEY: fromWorkerEnv
      ? env.IDENTITY_SERVICE_PUBLIC_KEY
      : process.env.IDENTITY_SERVICE_PUBLIC_KEY || "",
    AWS_READ_ACCESS_GROUP_ID: fromWorkerEnv
      ? env.AWS_READ_ACCESS_GROUP_ID
      : process.env.AWS_READ_ACCESS_GROUP_ID || "",
  };
  return Env;
}

configFromDotEnv();

const config = (env: env) => {
  const environment: environment = {
    production: {
      RDS_BASE_API_URL: RDS_BASE_API_URL,
      VERIFICATION_SITE_URL: VERIFICATION_SITE_URL,
      TRACKING_CHANNEL_URL: RDS_TRACKING_CHANNEL_URL,
      PROFILE_SERVICE_HELP_GROUP_ID: DISCORD_PROFILE_SERVICE_HELP_GROUP,
      RDS_STATUS_SITE_URL: RDS_STATUS_SITE_URL,
      DASHBOARD_SITE_URL: RDS_DASHBOARD_SITE_URL,
    },
    staging: {
      RDS_BASE_API_URL: RDS_BASE_STAGING_API_URL,
      VERIFICATION_SITE_URL: STAGING_VERIFICATION_SITE_URL,
      TRACKING_CHANNEL_URL: STAGING_RDS_TRACKING_CHANNEL_URL,
      PROFILE_SERVICE_HELP_GROUP_ID: DISCORD_PROFILE_SERVICE_STAGING_HELP_GROUP,
      RDS_STATUS_SITE_URL: RDS_STAGING_STATUS_SITE_URL,
      DASHBOARD_SITE_URL: RDS_STAGING_DASHBOARD_SITE_URL,
    },
    default: {
      RDS_BASE_API_URL: RDS_BASE_DEVELOPMENT_API_URL,
      VERIFICATION_SITE_URL: DEVELOPMENT_VERIFICATION_SITE_URL,
      TRACKING_CHANNEL_URL: DEVELOPMENT_RDS_TRACKING_CHANNEL_URL,
      PROFILE_SERVICE_HELP_GROUP_ID:
        DISCORD_PROFILE_SERVICE_DEVELOPMENT_HELP_GROUP,
      RDS_STATUS_SITE_URL: RDS_STATUS_SITE_URL,
      DASHBOARD_SITE_URL: RDS_DASHBOARD_SITE_URL,
    },
  };

  return environment[env.CURRENT_ENVIRONMENT] || environment.default;
};

export default config;
