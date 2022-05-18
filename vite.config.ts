import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: "terser",
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
      // @ts-ignore
      manualChunks(id) {
        if (id.includes("node_modules")) {
          return id.split("node_modules/")[1].split("/")[0];
        }
      },
    },
  },
});
