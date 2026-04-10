import { defineConfig } from "eslint/config";

import { baseConfig, restrictEnvAccess } from "@repo/eslint-config/base";
import { reactConfig } from "@repo/eslint-config/react";

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
