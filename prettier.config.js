/** @type {import("prettier").Options} */
const config = {
	useTabs: true,
	tabWidth: 2,
	singleQuote: true,
	printWidth: 100,
	trailingComma: 'es5',
	plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
};

export default config;
