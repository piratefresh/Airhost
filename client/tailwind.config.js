const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.red.500"),
            strong: {
              color: theme("colors.orange.500"),
            },
            blockquote: {
              color: theme("colors.orange.700"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.500"),
            strong: {
              color: theme("colors.pink.500"),
            },
            blockquote: {
              color: theme("colors.pink.700"),
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ["dark"],
  },
  plugins: [require("@tailwindcss/typography")],
};
