import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 300,
    host: true,
  },
  base: "/",
  plugins: [react()],
});
