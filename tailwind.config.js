/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography')
  ],
  theme: {
    extend: {
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