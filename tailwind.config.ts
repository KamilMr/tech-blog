import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        terminal: {
          ink: '#c9d1d9',
          bg: '#0d1117',
          surface: '#161b22',
          line: '#21262d',
          muted: '#8b949e',
          accent: '#3fb950',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        blink: {
          '0%,100%': {opacity: '1'},
          '50%': {opacity: '0'},
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
