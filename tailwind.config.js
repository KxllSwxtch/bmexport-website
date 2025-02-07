/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#FF6600', // Оранжевый цвет из логотипа
				dark: '#1E1E1E', // Чёрный цвет
				light: '#F8F8F8', // Светлый цвет
			},
		},
	},
	plugins: [],
}
