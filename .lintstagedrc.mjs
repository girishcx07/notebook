export default {
  "*.{js,mjs,cjs,ts,tsx}": [
    "pnpm exec eslint --fix --max-warnings=0",
    "pnpm exec prettier --config ./configs/prettier/index.js --write",
  ],
  "*.{css,html,json,md,yaml,yml}": [
    "pnpm exec prettier --config ./configs/prettier/index.js --write",
  ],
};
