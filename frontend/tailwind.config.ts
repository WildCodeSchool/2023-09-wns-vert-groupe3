import type { Config } from "tailwindcss";
const { createThemes } = require("tw-colors");

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5461FC",
        success: "#5CB85C",
        warning: "#F0AD4E",
        danger: "#D9534F",
      },
    }
  },
  plugins: [
    createThemes({
      light: {
        "theme": "#FFFFFF",
        "lowcontrast": "#FFFFFF",
        "hightcontrast": "#000000",
        neutral: {
          "DEFAULT": "#F8F8F8",
          "100": "#EBEBEB",
          "200": "#D4D4D4",
        },
      },
      dark: {
        "theme": "#000000",
        "lowcontrast": "#000000",
        "hightcontrast": "#FFFFFF",
        neutral: {
          "DEFAULT": "#090909",
          "100" : "#353535",
          "200": "#121212",
        },
      },
    }),
  ],
};
export default config;
