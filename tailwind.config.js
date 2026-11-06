/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tg: {
          void: '#080709',
          ink: '#0e0d11',
          paper: '#151318',
          slate: '#1e1b22',
          bone: '#efe9dd',
          parchment: '#cfc6b6',
          ash: '#8d857b',
          crimson: '#b80f17',
          blood: '#7d090f',
          scarlet: '#d9141e',
          steel: '#6e7685',
        },
      },
      fontFamily: {
        display: ['"Oswald"', 'Impact', 'sans-serif'],
        serif: ['"Shippori Mincho"', 'Georgia', 'serif'],
        sans: ['"Archivo"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'ink': '4px 4px 0px #000000',
        'ink-lg': '6px 6px 0px #000000',
        'blood-offset': '4px 4px 0px #8a0a10',
        'bone-offset': '3px 3px 0px #efe9dd',
      },
      keyframes: {
        fadeInSharp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slashSweep: {
          '0%': { transform: 'translateX(-120%) skewX(-24deg)' },
          '100%': { transform: 'translateX(220%) skewX(-24deg)' },
        },
        subtleBreathe: {
          '0%, 100%': { opacity: '0.78' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-sharp': 'fadeInSharp 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slash-sweep': 'slashSweep 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
        'breathe': 'subtleBreathe 3.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
