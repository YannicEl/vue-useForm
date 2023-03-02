import { defineConfig, presetIcons, presetWind, transformerDirectives } from 'unocss';

export default defineConfig({
	presets: [presetWind(), presetIcons({ warn: true, cdn: 'https://esm.sh/' })],
	transformers: [transformerDirectives()],
});
