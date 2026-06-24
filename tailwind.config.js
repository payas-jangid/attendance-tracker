/** @type {import('tailwindcss').Config} */
module.exports = {
  // 🎯 Tell Tailwind where your code files live so it scans your custom styles
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // 📻 Registering your custom Plus Jakarta Sans fonts!
      fontFamily: {
        "sans-reg": ["sans-regular"],
        "sans-med": ["sans-medium"],
        "sans-semi": ["sans-semibold"],
        "sans-bold": ["sans-bold"],
        "sans-extra": ["sans-extrabold"],
        "sans-light": ["sans-light"],
      },
    },
  },
  plugins: [],
};
