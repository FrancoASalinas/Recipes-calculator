/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mimipink' : '#FFE1EA',
        'richblack' : '#001514',
        'nn' : '#3685B5'
      },
      fontFamily: {
        'croissant' : 'Croissant',
        'incsans' : 'Inclusive Sans'
      }
    },
  },
  plugins: [],
}

