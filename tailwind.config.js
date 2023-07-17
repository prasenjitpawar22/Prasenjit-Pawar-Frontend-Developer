import banner from "./public/banner.jpg";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        primary: "var(--primary-text)",
        secondary: "var(--secondary-text)",
        ternary: "var(--ternary-text)",
      },
      backgroundColor: {},
      colors: {
        pinky: "var(--pinky)",
        blueGreeny: "var(--blue-greeny)",
        teenyGreeny: "var(--teeny-greeny)",
      },
      backgroundImage: {
        // bnner:
      },
    },
  },
  plugins: [],
};
