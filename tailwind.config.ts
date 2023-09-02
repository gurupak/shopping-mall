import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryWhite: "#ffece3",
        cat1: "#d6d4d8",
        cat2: "#efe1c7",
        cat3: "#d7d7d9",
        cat4: "#212121",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config
