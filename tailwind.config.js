/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js", // <-- this line
    "./node_modules/flowbite/**/*.js", // <-- optional but recommended
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbitePlugin // <-- this line
  ],
}