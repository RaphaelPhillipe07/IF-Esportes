/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F1FBF5',
          100: '#DDF7E8',
          200: '#B6EBCE',
          300: '#7BD9A6',
          400: '#35B874',
          500: '#16975A',
          600: '#127A47',
          700: '#0E5F37',
          800: '#0A4B2C',
          900: '#063A22',
          950: '#042416',
        },
        lime: {
          200: '#E9FBB5',
          300: '#D8F76B',
          400: '#C6F135',
          500: '#A8D51C',
        },
        ink: {
          50: '#F6F8F7',
          100: '#E8EDEA',
          200: '#D5DCD8',
          300: '#A7B3AD',
          400: '#7C8B84',
          500: '#5B6B63',
          600: '#43524B',
          700: '#2B3A33',
          800: '#1B2721',
          900: '#121C18',
          950: '#0B1210',
        },
        paper: '#F7F8F3',
        gold: '#D9A21B',
        danger: '#C23B3B',
        info: '#2563EB',
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Archivo Variable', 'Archivo', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,18,16,.04), 0 10px 30px -18px rgba(11,18,16,.25)',
        lift: '0 18px 45px -22px rgba(6,58,34,.35)',
        float: '0 24px 60px -30px rgba(4,36,22,.45)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      maxWidth: {
        page: '1240px',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.55' },
        },
      },
      animation: {
        'fade-up': 'fade-up .5s cubic-bezier(.22,1,.36,1) both',
        'fade-in': 'fade-in .4s ease-out both',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
