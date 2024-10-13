#!/bin/bash

ENV_VARS_FILE="environment-variables.txt"
# Check if the file exists
if [[ ! -f "$ENV_VARS_FILE" ]]; then
  echo "File $ENV_VARS_FILE does not exist."
  exit 1
fi

# Read the file and iterate through each variable name
while IFS= read -r var_name; do
  # Check if the variable is set in the environment
  if [[ -z "${!var_name}" ]]; then
    echo "Environment variable $var_name is not set."
    exit 1  # Exit with error if any variable is not set
  else
    echo "Environment variable $var_name is set."
  fi
done < "$ENV_VARS_FILE"