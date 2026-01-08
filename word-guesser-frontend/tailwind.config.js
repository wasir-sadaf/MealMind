/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- THIS MATCHES ALL YOUR FILES
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}