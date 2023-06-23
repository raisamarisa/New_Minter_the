/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],


  theme: {
    fontFamily: {
      Ahsing:['Ahsing'],
      Montserrat:['Montserrat','sans-serif'],
      
      },
    screens:{
    'esm': {'max': '400px'},
    'sm': '640px',
    // => @media (min-width: 640px) { ... }

    'md': '768px',
    // => @media (min-width: 768px) { ... }

    'lg': '1024px',
    // => @media (min-width: 1024px) { ... }

    'xl': '1280px',
  },
    extend: {
      animation: {
        blob: "blob 7s infinite",
      },
   
    },
  },
  plugins: [],
}