/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f172a', // Slate 900
          light: '#1e293b',   // Slate 800
          dark: '#020617',    // Slate 950
        },
        accent: {
          DEFAULT: '#f59e0b', // Amber 500
          light: '#fbbf24',   // Amber 400
          dark: '#d97706',    // Amber 600
        },
        success: {
          DEFAULT: '#10b981', // Emerald 500
          light: '#34d399',   // Emerald 400
        },
      },
      fontFamily: {
        display: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        body: ['Source Sans 3', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
