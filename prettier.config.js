/** @type {import("prettier").Options} */
const config = {
	useTabs: true,
	tabWidth: 2,
	singleQuote: true,
	printWidth: 100,
	trailingComma: 'es5',
	plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-organize-imports'],
};

export default config;
