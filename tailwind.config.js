/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      keyframes: {
        notification: {
          '0%, 100%': { opacity:0 },
          '10%, 90%': { opacity:1 },
        }
      },
      animation: {
        notification: 'notification 4s ease-in forwards',
        'spin-slow': 'spin 1s linear infinite',
      }
    },
  },
  plugins: [],
}
