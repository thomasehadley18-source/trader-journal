/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#020817",
        card: "#0f172a",
        border: "#1e293b",
        primary: "#3b82f6"
      }
    }
  },
  plugins: [],
}