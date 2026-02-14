const { transform } = require('@babel/core');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{jsx,js, ts, tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "valentines-pink": "#ffeef8",
        "valentines-pink-dark": "#ffe0f0",
        "valentines-red": "#d63384",
      },
      keyframes: {
        bounce: {
          "0%, 100%":{transform: "translateY(0) rotate(-5deg)"},
          "50%":{transform: "translateY(-20px) rotate(5deg)"},
        },
        wiggle: {
          "0%, 100%":{transform: "rotate(-10deg)"},
          "50%":{transform: "rotate(10deg)"},
        },
        float: {
          "0%":{transform: "translateY(0) rotate(0deg)", opacity:"0"},
          "10%":{opacity: "1"},
          "90%":{opacity: "1"},
          "100%":{transform: "translateY(-100vh) rotate(360deg)", opacity:"0"},
        },
        explode: {
          "0%":{transform: "translate(0,0) scale(0)", opacity:"1"},
          "100%":{transform: "translate(var(--random-x,0px)) translate(var(--random-y,0px)) scale(1)", opacity:"0"},
        },
        fadeIn: {
          "from":{opacity:"0"},
          "to":{opacity: "1"}
        },
        scaleIn: {
          "from":{transform:"scale(0)"},
          "to":{transform: "scale(1)"}
        }
      },
      animation:{
        "bounce-custom": "bounce 2s infinite ease-in-out",
        "wiggle": "wiggle 1s infinite ease-in-out",
        "float": "float 8s infinite ease-in-out",
        "explode": "explode 2s forwards ease-out",
        "fadeIn": "fadeIn 0.5s ease-in",
        "scaleIn": "scaleIn 0.5s ease-out"
      }
    },
  },
  plugins: [],
}

