import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	clean: true,
	dts: true,
	sourcemap: true,
	watch: !!options.watch,
	outDir: 'dist',
}));
