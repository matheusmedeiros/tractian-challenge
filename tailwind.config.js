/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.2s ease-in-out',
      },
      colors: {
				'background': '#e3eaef',
				'header': '#17192d',
				'border':'#d8dfe6',
				'button-company': '#023b78',
				'button-company-active': '#2188ff',
				'title': '#24292f',
				'secondary': '#77818c'
			},
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}