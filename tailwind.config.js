/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        google: {
          "text-gray": "#3c4043",
          "button-blue": "#1a73e8",
          "button-blue-hover": "#5195ee",
          "button-dark": "#202124",
          "button-dark-hover": "#555658",
          "button-border-light": "#dadce0",
          "logo-blue": "#4285f4",
          "logo-green": "#34a853",
          "logo-yellow": "#fbbc05",
          "logo-red": "#ea4335",
        },
      },
    },
  },

  plugins: [require("daisyui")],
};
