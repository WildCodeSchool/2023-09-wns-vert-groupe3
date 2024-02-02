import type { Config } from "tailwindcss";
const { createThemes } = require("tw-colors");

const { violet, blackA } = require('@radix-ui/colors');

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font_montserrat)"],
      },
      colors: {
        primary: "#5461FC",
        success: "#5CB85C",
        warning: "#F0AD4E",
        danger: "#D9534F",
        ...violet,
        ...blackA,
      },
    },
    keyframes: {
      slideDownAndFade: {
        from: { opacity: "0", transform: 'translateY(-2px)' },
        to: { opacity: "1", transform: 'translateY(0)' },
      },
      slideLeftAndFade: {
        from: { opacity: "0", transform: 'translateX(2px)' },
        to: { opacity: "1", transform: 'translateX(0)' },
      },
      slideUpAndFade: {
        from: { opacity: "0", transform: 'translateY(2px)' },
        to: { opacity: "1", transform: 'translateY(0)' },
      },
      slideRightAndFade: {
        from: { opacity: "0", transform: 'translateX(-2px)' },
        to: { opacity: "1", transform: 'translateX(0)' },
      },
    },
    animation: {
      slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
    },
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
          "300" : "#B9B9B9"
        },
      },
      dark: {
        "theme": "#000000",
        "lowcontrast": "#000000",
        "hightcontrast": "#FFFFFF",
        neutral: {
          "DEFAULT": "#090909",
          "100" : "#121212",
          "200": "#353535",
          "300" : "#555555"
        },
      },
    }),
  ],
};
export default config;
