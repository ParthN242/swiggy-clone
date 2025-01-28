/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-black": "rgb(61, 65, 82)",
        "light-gray": "rgb(40, 44, 63)",
      },
      boxShadow: {
        "1-sm": "0 1px 20px -5px rgba(0, 0, 0, 0.3)",
      },
      screens: {
        xsm: "350px",
      },
    },
  },
  plugins: [],
};
