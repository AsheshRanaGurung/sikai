import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve("src/"),
      "@sikaai": path.resolve("src"),
      "@sikaai/icons": path.resolve("src/components/common/icons"),
      "@sikaai/assets": path.resolve("src/assets"),
      "@sikaai/hooks": path.resolve("src/hooks"),
      "@sikaai/components": path.resolve("src/components"),
      "@sikaai/pages": path.resolve("src/pages"),
      "@sikaai/providers": path.resolve("src/providers"),
      "@sikaai/routes": path.resolve("src/routes"),
      "@sikaai/service": path.resolve("src/service"),
      "@sikaai/theme": path.resolve("src/theme"),
      "@sikaai/translations": path.resolve("src/translations"),
      "@sikaai/types": path.resolve("src/types"),
      "@sikaai/utils": path.resolve("src/utils"),
    },
  },
});
