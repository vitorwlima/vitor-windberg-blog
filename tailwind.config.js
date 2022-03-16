const tailwindColors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      ...tailwindColors,
      'blue-main': '#2A7DE1',
    },
  },
  plugins: [],
}
