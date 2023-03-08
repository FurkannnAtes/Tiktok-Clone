/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        mainRed: "#FF3B5C",
        mainBlack: "#121212",
      },
      borderColor: {
        mainRed: "#FF3B5C",
        mainBlack: "#121212",
      },
      textColor: {
        mainRed: "#FF3B5C",
        mainBlack: "#121212",
      },
    },
  },
  plugins: [],
};
