/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		screens: {
			dt: '1200px'
		},
		extend: {
			backgroundImage: {
				'radial-gradient-white': 'radial-gradient(circle, transparent 10%, white)'
			}
		}
	},

	plugins: []
};
