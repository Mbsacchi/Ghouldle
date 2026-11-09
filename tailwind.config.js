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
        cx: {
          pitch: '#0a0a0c',
          asphalt: '#16161a',
          paper: '#f4f1ea',
          yellow: '#FFE600',
          green: '#A3FF00',
          magenta: '#FF0055',
          cyan: '#00F0FF',
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
        'cx-yellow': '5px 5px 0px #FFE600',
        'cx-green': '5px 5px 0px #A3FF00',
        'cx-magenta': '4px 4px 0px #FF0055',
        'cx-cyan': '4px 4px 0px #00F0FF',
        'cx-black': '5px 5px 0px #0a0a0c',
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
        raisePulse: {
          '0%, 100%': {
            boxShadow: '4px 4px 0px #FFE600, 0 0 0px rgba(163, 255, 0, 0)',
            transform: 'skewX(-3deg) scale(1)',
          },
          '50%': {
            boxShadow: '6px 6px 0px #FF0055, 0 0 18px rgba(163, 255, 0, 0.45)',
            transform: 'skewX(-3deg) scale(1.015)',
          },
        },
        universeFlash: {
          '0%': { opacity: '0.35', transform: 'scale(0.992)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-sharp': 'fadeInSharp 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slash-sweep': 'slashSweep 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
        'breathe': 'subtleBreathe 3.8s ease-in-out infinite',
        'raise-pulse': 'raisePulse 1.8s ease-in-out infinite',
        'universe-switch': 'universeFlash 0.32s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },
  plugins: [],
};
