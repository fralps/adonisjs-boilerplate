#!/bin/bash

# Define non-authorized licenses
NON_AUTHORIZED_LICENSES=("GPL" "AGPL" "LGPL" "MPL")

# Get all package.json dependencies
dependencies=$(npm list --json | jq -r '.dependencies | keys[]')

# Create an empty array to store the non-authorized packages
non_authorized_packages=()

# Check each dependency
for package in $dependencies; do
  # Get the license of the package
  license=$(curl -s "https://registry.npmjs.org/$package" | jq -r '.license')

  # Check if the license is not authorized
  for non_auth_license in "${NON_AUTHORIZED_LICENSES[@]}"; do
    if [[ "$license" == "$non_auth_license" ]]; then
      non_authorized_packages+=("$package")
      break
    fi
  done
done

# Print a recap of the non-authorized packages
if [ ${#non_authorized_packages[@]} -ne 0 ]; then
  echo "❌ The following packages have non-authorized licenses:"
  for package in "${non_authorized_packages[@]}"; do
    echo "$package"
  done
  exit 1
else
  echo "✅ All packages have authorized licenses."
fi