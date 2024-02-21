/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        128: "32rem"
      },
      fontSize: {
        "2xs": "0.4rem"
      },
      colors: {
        brown: {
          600: "#E0B88A" // 갈색 계열의 색상 코드
        }
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      },
      animation: {
        fadeIn: "fadeIn 2.5s ease-in-out forwards"
      }
    }
  },
  plugins: [require("tailwind-scrollbar-hide")]
}
