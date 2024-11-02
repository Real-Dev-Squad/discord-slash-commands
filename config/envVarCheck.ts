import { env } from "../src/typeDefinitions/default.types";
import { loadEnv } from "./config";

validateEnv();

/**
 * Validate if all the required environment variables are set to a non empty value
 * else throw an error
 * ---
 */
export function validateEnv() {
  //pass empty object as env and fromWorkerEnv = false, since this method is should get executed in github actions and not in worker
  const envLoadedFromProcess: env = loadEnv({}, false);
  const missingEnvVars = Object.keys(envLoadedFromProcess).filter(
    (key) => envLoadedFromProcess[key] == ""
  );

  // Logging missing environment variables and throw error if any are missing
  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing environment variables: ${missingEnvVars.join(", ")}`
    );
  } else {
    console.log("All required environment variables are set.");
  }
}
