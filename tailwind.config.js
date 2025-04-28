module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Army-GI", "Arial", "Helvetica", "sans-serif"],
      },
      colors: {
        "army-gold": "var(--Army-Gold)",
        "army-black": "var(--Primary-Army-Black)",
        "army-white": "var(--Army-White)",
        "army-grey": "var(--Medium-Grey)",
        "army-tan": "var(--Army-Tan)",
      },
    },
  },
  plugins: [],
};
