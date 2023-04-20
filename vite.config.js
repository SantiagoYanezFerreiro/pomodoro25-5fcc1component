import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: /pomodoro25-5fcc1component/,
  plugins: [react()],
});
