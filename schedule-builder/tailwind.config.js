/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        "primary-dark": "#6D28D9",
        secondary: "#D946EF",
        "accent-pink": "#E856CA",
        "accent-blue": "#3B82F6",
        "background-light": "#F8FAFC",
        "background-dark": "#0F172A",
        "surface-light": "#FFFFFF",
        "surface-dark": "#1E293B",
        "card-light": "#FFFFFF",
        "card-dark": "#1E293B",
        "text-light": "#334155",
        "text-dark": "#E2E8F0",
        "border-light": "#E2E8F0",
        "border-dark": "#2D2D35"
      },
      fontFamily: {
        display: ["'Oswald'", "sans-serif"],
        body: ["'Roboto'", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
  plugins: [],
}
