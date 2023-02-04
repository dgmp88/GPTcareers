/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      keyframes: {
        blurry: {
          "0%": { "-webkit-filter": "blur(8px)" },
          "100%": { "-webkit-filter": "blur(0px)" },
        },
      },
      animation: {
        blurry: "blurry 1s linear forwards",
      },
      colors: {
        primary: "#ffffff",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ffffff",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
