/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0a0e1a',
          900: '#0f1428',
          800: '#1a2540',
          700: '#253358',
          600: '#2d3f6b',
        },
        steel: {
          500: '#3d4a6b',
          400: '#5a6a8f',
          300: '#7a8ab0',
        },
        neon: {
          green: '#3dff9a',
          cyan: '#00ffaa',
        },
        bronze: {
          DEFAULT: '#e8b88a',
          dark: '#c4956a',
          light: '#f0d0a8',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 8px rgba(61, 255, 154, 0.6)) drop-shadow(0 0 20px rgba(61, 255, 154, 0.3))',
          },
          '50%': {
            filter: 'drop-shadow(0 0 16px rgba(61, 255, 154, 0.9)) drop-shadow(0 0 40px rgba(61, 255, 154, 0.5))',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
