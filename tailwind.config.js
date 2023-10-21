/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      "white":"#ffffff",
      "black":"#000000",
      "primary":"#F3F3F3",
      "secondary":"#CBCBCB",
      "tertiary":"#505050",
      "yellow-green":"#A5F951",
      "green":"#7CC390",
      "red":"#EB3838"
    },
    extend: {},
  },
  plugins: [],
}

