import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: '@vuetils/form',
	description: 'Vue form validation made easy',

	lastUpdated: true,
	cleanUrls: true,

	themeConfig: {
		nav: [
			{ text: 'Guide', link: '/getting-started' },
			{ text: 'API', link: '/api' },
		],

		sidebar: [
			{
				text: 'Introduction',
				items: [
					{ text: 'Getting Started', link: '/getting-started' },
					{ text: 'Runtime API Examples', link: '/api-examples' },
				],
			},
			{
				text: 'Core Concepts',
				items: [],
			},
			{
				text: 'Plugins',
				items: [],
			},
			{
				text: 'API',
				items: [],
			},
		],

		socialLinks: [{ icon: 'github', link: 'https://github.com/YannicEl/vue-useForm' }],

		editLink: {
			pattern: 'https://github.com/YannicEl/vue-useForm/edit/main/packages/docs/:path',
			text: 'Edit this page on GitHub',
		},

		search: {
			provider: 'local',
		},
	},

	sitemap: {
		hostname: 'https://example.com',
		lastmodDateOnly: true,
	},

	vite: {
		plugins: [UnoCSS()],
	},
});
