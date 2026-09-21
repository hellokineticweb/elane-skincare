/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        accent: ['Italiana', '"Cormorant Garamond"', 'serif']
      },
      colors: {
        gold: {
          primary: '#C5A880',
          vivid: '#D4AF37',
          subtle: '#E2D2B8'
        },
        sage: {
          soft: '#A3B19B',
          muted: '#82927A',
          bg: '#EBF0E9'
        }
      }
    },
  },
  plugins: [],
}
