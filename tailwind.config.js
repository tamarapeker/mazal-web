/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {  colors: {
        "brand-dark": "#144220",
      "brand-medium": "#1E6F3C",
        "brand-light": "#4ade80"
      },},
  },
  plugins: [],
}

