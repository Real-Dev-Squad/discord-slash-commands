#!/bin/bash

for var_name in $ENV_VAR_NAMES; do
  # Check if the variable is set in the environment
  if [[ -z "${!var_name}" ]]; then
    echo "Environment variable $var_name is not set."
    exit 1  # Exit with error if any variable is not set
  fi
done
echo "All Environment variables are set."
