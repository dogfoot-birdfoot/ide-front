/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customGray: "#353A3D"
      },
      height: {
        128: "32rem"
      }
    }
  },
  plugins: [require("tailwind-scrollbar-hide")]
}
