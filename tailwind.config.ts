import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FBF8F3',
          100: '#F7F1E8',
          200: '#F1E8D8',
        },
        rose: {
          dust: '#D8A7A0',
          deep: '#B98A86',
        },
        mauve: {
          DEFAULT: '#B08FA0',
          soft: '#C7A6B5',
        },
        plum: {
          DEFAULT: '#7A5969',
          deep: '#5C3F4E',
        },
        sage: {
          DEFAULT: '#A8B89A',
          deep: '#8AA083',
        },
        ink: '#3A2A33',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'noise':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.2  0 0 0 0 0.15  0 0 0 0 0.18  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(122, 89, 105, 0.25)',
        glow: '0 0 50px -10px rgba(216, 167, 160, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 4s linear infinite',
        bounceSoft: 'bounceSoft 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
