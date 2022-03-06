module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        JosefinSans: ["JosefinSans", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
