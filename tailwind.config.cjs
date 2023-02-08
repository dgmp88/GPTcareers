/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,html,svelte}'],
	theme: {
		extend: {
			keyframes: {
				fade: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				}
			},
			animation: {
				'fade-in': 'fade 0.5s ease-in-out 1'
			}
		}
	},
	plugins: [require('daisyui')]
};
