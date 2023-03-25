/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    fontWeight: {
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
