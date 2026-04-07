import { defineConfig } from "eslint/config";

import { baseConfig, restrictEnvAccess } from "@acme/eslint-config/base";
import { reactConfig } from "@acme/eslint-config/react";

export default defineConfig(
  {
    ignores: [".nitro/**", ".output/**", ".tanstack/**"],
  },
  baseConfig,
  reactConfig,
  restrictEnvAccess,
  {
    files: ["e2e/**/*.ts"],
    rules: {
      "no-restricted-properties": "off",
    },
  },
);
