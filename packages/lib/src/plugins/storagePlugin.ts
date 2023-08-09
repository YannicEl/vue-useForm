import { watch } from 'vue';
import { definePlugin } from './index';

export interface StoragePluginOptions {
	key: string;
	storage: Storage;
}

export const storagePlugin = definePlugin<StoragePluginOptions>((form, { key, storage }) => {
	const restoreState = () => {
		try {
			const state = storage.getItem(key);

			if (!state) {
				console.log('No state to restor');
				return;
			}

			const json = JSON.parse(state);
			form.setValues(json);
		} catch (err) {
			console.log('Error restoring state');
			console.log(err);
		}
	};

	const saveState = (state: Record<string, any>) => {
		try {
			const string = JSON.stringify(state);
			storage.setItem(key, string);
		} catch (err) {
			console.log('Error saving state');
			console.log(err);
		}
	};

	console.log('Init Storage Plugin');
	restoreState();

	watch(
		() => form.values,
		(values) => {
			saveState(values);
		},
		{ deep: true }
	);
});

export function localStoragePlugin(key: string) {
	return storagePlugin({ key, storage: localStorage });
}

export function sessionStoragePlugin(key: string) {
	return storagePlugin({ key, storage: sessionStorage });
}
