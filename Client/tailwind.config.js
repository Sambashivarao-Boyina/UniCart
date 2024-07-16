/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {},
  },
  darkMode: false, // Disable dark mode
  plugins: [
    require('daisyui'),
    function ({ addBase, addComponents, addUtilities, theme }) {
      addUtilities({
        '.no-spinner': {
          '-webkit-appearance': 'none',
          'margin': '0',
        },
        '.no-spinner::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          'margin': '0',
        },
        '.no-spinner::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          'margin': '0',
        },
        '.no-spinner': {
          '-moz-appearance': 'textfield',
        },
      });
    }
  ],
  daisyui: {
    themes: ["light"], // Use only the light theme
  },
});
