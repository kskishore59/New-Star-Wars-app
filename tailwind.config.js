module.exports = {
	content: [
		"./src/**/*.{html,js}",
		"./node_modules/flowbite/**/*.js",
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [
		require("tailwindcss"),
		//ts-ignore
		require("autoprefixer"),
		//ts-ignore
		require("flowbite/plugin"),
		{
			tailwindcss: { config: "./tailwindcss-config.js" },
		},
		require("postcss"),
		{
			tailwindcss: {},
			autoprefixer: {},
		},
	],
};
