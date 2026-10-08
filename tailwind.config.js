/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: '#0D1B2A',
        emerald: {
          DEFAULT: '#1A936F',
          dark: '#146B52',
          light: '#25B389',
        },
        orange: {
          DEFAULT: '#E8762C',
          dark: '#C85A1E',
          light: '#F5A83D',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#F0C060',
        },
        teal: '#00B4A6',
        offwhite: '#F6F8F5',
        textdark: '#132019',
        midgray: '#667269',
      },
      fontFamily: {
        display: ['"Baloo 2"', 'ui-rounded', 'sans-serif'],
        body: ['"Figtree"', 'Calibri', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'ndebele-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.08'%3E%3Cpath d='M40 0L50 20 40 40 30 20zM40 40L50 60 40 80 30 60zM0 40L20 30 40 40 20 50zM40 40L60 30 80 40 60 50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'sunrise': 'radial-gradient(900px 420px at 85% -20%, rgba(232,118,44,.30), transparent 60%), radial-gradient(700px 380px at 5% 110%, rgba(26,147,111,.28), transparent 60%), linear-gradient(160deg,#fffdf8,#f3f6f1 70%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(26, 147, 111, 0.25)',
        soft: '0 14px 30px -18px rgba(19, 32, 25, 0.35)',
      },
    },
  },
  plugins: [],
}
