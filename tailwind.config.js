/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.vue'],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
},
}

