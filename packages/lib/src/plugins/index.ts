import { Form } from '../useForm';

export * from './storagePlugin';

export type Plugin<TForm extends Form = Form> = (form: TForm) => void;
export type PluginFactory<TForm extends Form = Form> = (...params: any) => Plugin<TForm>;

export function definePlugin<TArgs = undefined, TForm extends Form = Form>(
	fn: (form: TForm, args: TArgs) => void
): PluginFactory<TForm> {
	return (args: TArgs) => (form: TForm) => {
		fn(form, args);
	};
}
