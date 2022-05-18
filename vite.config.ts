import { defineConfig } from "vite";

const mainChunk = ["animejs", "howler"];
const libChunk = ["echarts"];
const utilChunk = ["dayjs"];

export default defineConfig({
  build: {
    minify: "terser",
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        ascii_only: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: mainChunk,
          vendor2: libChunk,
          vendor3: utilChunk,
        },
      },
    },
  },
});
