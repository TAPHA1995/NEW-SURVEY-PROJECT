/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes:{
        'fade-in-right': {
          "from":{
            transform: "translateX(1.30rem)",
            opacity:'0'
          },
          "to":{
            transform:"translateX(0rem)",
            opacity:'1'
          },
        },
      },
      animation: {
        'fade-in-right':"fade-in-right 1s ease-in-out both",
      }
    },
  },
  plugins: [],
}

