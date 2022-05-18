import { defineConfig } from "vite";

const chunk1 = ["animeJS", "howler"];
const chunk2 = ["echarts"];
const chunk3 = ["dayjs"];

export default defineConfig({
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
