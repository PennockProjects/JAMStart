/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography')
  ],
  theme: {
    extend: {
      fontFamily: {
        // JMSTfont start default Font family CSS
        brand: ['Rubik', 'sans-serif'],
        // JMSTfont end default Font family CSS
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100ch', // add required value here
          }
        }
      }
    },
  },
}