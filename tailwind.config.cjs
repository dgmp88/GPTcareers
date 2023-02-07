/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,html,svelte}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')]
};
