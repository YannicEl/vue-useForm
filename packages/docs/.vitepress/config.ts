import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: '@vuetils/form',
	description: 'Tiny form valdiation library for vue 3',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Examples', link: '/markdown-examples' },
		],

		sidebar: [
			{
				text: 'Examples',
				items: [
					{ text: 'Markdown Examples', link: '/markdown-examples' },
					{ text: 'Runtime API Examples', link: '/api-examples' },
				],
			},
		],

		socialLinks: [{ icon: 'github', link: 'https://github.com/YannicEl/vue-useForm' }],
	},

	sitemap: {
		hostname: 'https://example.com',
		lastmodDateOnly: true,
	},

	vite: {
		plugins: [UnoCSS()],
	},
});
