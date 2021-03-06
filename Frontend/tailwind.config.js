/* eslint-disable no-undef */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'warm-gray': colors.stone,
        teal: colors.teal,

        chsBlue: '#12ADC1',
        chsDarkBlue: '#0295A9',
        chsYellow: '#FFCB21',
        chsGray: '#454545',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')],
};
