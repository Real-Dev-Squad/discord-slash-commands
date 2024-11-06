import { env } from "../src/typeDefinitions/default.types";
import { loadEnv } from "./config";

/**
 * Validate if all the required environment variables are set to a non empty value
 * else throw an error
 * ---
 */
export function validateEnv() {
  const env: env = loadEnv({}, false);
  const missingEnvVariables = Object.keys(env).filter((key) => env[key] == "");

  if (missingEnvVariables.length > 0) {
    throw new Error(
      `Missing environment variables: ${missingEnvVariables.join(", ")}`
    );
  } else {
    console.log("All required environment variables are set.");
  }
}

validateEnv();
