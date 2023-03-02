import Vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		Vue(),
		UnoCSS(),
		AutoImport({
			imports: ['vue'],
			dts: 'src/auto-imports.d.ts',
			dirs: ['src/composables/*'],
			vueTemplate: true,
		}),
		Components({
			dirs: ['src/components'],
			extensions: ['vue'],
			include: [/\.vue$/, /\.vue\?vue/],
			dts: 'src/components.d.ts',
		}),
	],
});
