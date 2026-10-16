import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 950: "#08152a", 900: "#0b1b33", 800: "#10264a", 700: "#17335e" },
      },
    },
  },
  plugins: [],
};
export default config;
