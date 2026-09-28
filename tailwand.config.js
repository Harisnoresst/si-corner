/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Baris ini wajib ada agar class di .tsx terbaca
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}