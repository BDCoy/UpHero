/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        upwork: {
          green: "#14a800",
          "green-dark": "#108a00",
          "green-light": "#1cb31c",
          gray: "#001e00",
          "gray-light": "#5e6d55",
          "gray-lighter": "#9aaa97",
          background: "#f7faf7",
          "background-alt": "#e4ebe4",
        },
      },
      fontFamily: {
        sans: ["Inter var", "system-ui", "sans-serif"],
      },
      keyframes: {
        tilt: {
          "0%, 50%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(1deg)" },
          "75%": { transform: "rotate(-1deg)" },
        },
      },
      animation: {
        tilt: "tilt 10s infinite linear",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("tailwindcss-animated"),
  ],
};
