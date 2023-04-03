/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "main-page": "url('/home-page-background.png')",
        constellation: "url('/endless-constellation.svg')",
      },
    },
    fontFamily: {
      mali: ["Mali", "cursive"],
      gochi: ["Gochi Hand", "cursive"],
    },
  },
  plugins: [],
};
