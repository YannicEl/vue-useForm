import vue from '@vitejs/plugin-vue';
import { execSync } from 'child_process';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		{
			name: 'postbuild-types',
			closeBundle: async () => {
				const t1 = Date.now();
				console.log('Building types...');
				try {
					execSync('pnpm run build:types');
					console.log(`Types built in ${Date.now() - t1} ms`);
				} catch (error) {
					console.log(error);
				}
			},
		},
	],
	build: {
		lib: {
			// src/indext.ts is where we have exported the component(s)
			entry: resolve(__dirname, 'src/index.ts'),
			name: '@vuetils/form',
			// the name of the output files when the build is run
			fileName: 'index',
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: ['vue'],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
});
