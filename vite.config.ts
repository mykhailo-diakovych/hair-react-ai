import svgr from "vite-plugin-svgr";
import dynamicImport from "vite-plugin-dynamic-import";
import { defineConfig } from "vite";
import million from "million/compiler";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    million.vite({ auto: true }),
    react(),
    svgr(),
    dynamicImport(),
    basicSsl()
  ],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@config": "/src/config",
      "@styles": "/src/styles",
      "@assets": "/src/assets",
      "@hooks": "/src/hooks",
      "@features": "/src/features",
      "@helpers": "/src/helpers",
      "@services": "/src/services",
      "@api": "/src/api"
    }
  },
  root: "./",
  build: {
    outDir: "dist"
  },
  assetsInclude: ["**/*.deepar", "**/*.wasm", "**/*.bin"]
});
