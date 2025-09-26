import colors from "tailwindcss/colors";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors, // ✅ brings back bg-blue-600, text-gray-700, etc.
      },
    },
  },
  plugins: [],
}
