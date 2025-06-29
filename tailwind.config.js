/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3D7BFF",
        background: "#0A101A",
        surface: "#182233",
        "text-primary": "#FFFFFF",
        "text-secondary": "#B0B8C4",
        "text-accent": "#FDB913",
        success: "#4CAF50",
        warning: "#FFC107",
        error: "#F44336",
        info: "#2196F3",
      },
      fontFamily: {
        sans: ["SpaceMono", "sans-serif"],
      },
    },
  },
  plugins: [],
};