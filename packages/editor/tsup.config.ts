import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/styles/editor.css"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ["react", "react-dom"],
  injectStyle: false,
});
