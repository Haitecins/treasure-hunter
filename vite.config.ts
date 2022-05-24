import { defineConfig } from "vite";
import alias from "@rollup/plugin-alias";

const path = require("path");
const chunk1 = ["animejs", "howler"];
const chunk2 = ["echarts"];
const chunk3 = ["dayjs"];

export default defineConfig({
  plugins: [
    alias({
      entries: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "src"),
        },
      ],
    }),
  ],
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
      format: {
        ascii_only: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: chunk1,
          vendor2: chunk2,
          vendor3: chunk3,
        },
      },
    },
  },
});
