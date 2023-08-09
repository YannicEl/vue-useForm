import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vitepress';
import pgk from '../../lib/package.json' assert { type: 'json' };

export default defineConfig({
	title: '@vuetils/form',
	description: 'Vue form validation made easy',

	lastUpdated: true,
	cleanUrls: true,

	themeConfig: {
		nav: [
			{ text: 'Guide', link: '/introduction/getting-started' },
			{ text: 'API', link: '/api' },
			{ text: `Changelog (v${pgk.version})`, link: '/changelog' },
		],

		sidebar: [
			{
				text: 'Introduction',
				items: [
					{ text: 'Why?', link: '/introduction/' },
					{ text: 'Getting Started', link: '/introduction/getting-started' },
				],
			},
			{
				text: 'Core Concepts',
				items: [
					{ text: 'Define a form', link: '/core-concepts/' },
					{ text: 'Components', link: '/core-concepts/components' },
					{ text: 'Validators', link: '/core-concepts/validators' },
					{ text: 'Plugins', link: '/core-concepts/plugins' },
				],
			},
			{
				text: 'API Reference',
				link: '/api',
			},
			{
				text: 'Changelog',
				link: '/changelog',
			},
		],

		socialLinks: [{ icon: 'github', link: 'https://github.com/YannicEl/vue-useForm' }],

		footer: {
			copyright: 'Copyright © 2023-present Yannic Ellhotka',
			message: 'Released under the MIT License.',
		},

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
