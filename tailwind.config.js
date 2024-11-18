/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionDuration: {
        8000: "8000ms",
        4000: "4000ms",
        2000: "2000ms",
        1000: "1000ms",
        500: "500ms",
      },
    },
  },
  plugins: [],
};
