
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
   "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-dark-utp": "#02213e",
        "red-utp": "#d01a49",
        "blue-white-utp": "#0d6efd",
        "gray-utp": "#525252",
      },
    },
  },
  plugins: [  ],
};
