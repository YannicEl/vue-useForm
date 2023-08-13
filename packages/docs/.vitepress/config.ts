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
			{
				text: pgk.version,
				items: [
					{ text: 'Changelog', link: '/changelog' },
					{
						text: 'Contributing',
						link: 'https://github.com/YannicEl/vue-useForm/blob/main/.github/contributing.md',
					},
				],
			},
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
					{ text: 'Forms and Fields', link: '/core-concepts/' },
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
			{
				text: 'Feature Ideas',
				link: '/feature-ideas',
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
