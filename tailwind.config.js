/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        salone: {
          forest: '#071E14',
          forestDark: '#051810',
          forestCard: '#0B261A',
          cream: '#F5EEDB',
          creamLight: '#FAF6ED',
          creamMuted: '#D8CEBA',
          flagGreen: '#00A859',
          flagWhite: '#FFFFFF',
          flagBlue: '#0072C6',
          gold: '#D4AF37',
          goldLight: '#F3E5AB',
          navy: '#0B132B',
          navyLight: '#1C2541',
          slate: '#1E293B',
        }
      },
      fontFamily: {
        display: ['Cinzel', 'Playfair Display', 'serif'],
        serif: ['Playfair Display', 'Merriweather', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
