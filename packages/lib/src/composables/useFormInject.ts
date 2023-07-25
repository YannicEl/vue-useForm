import { inject, provide } from 'vue';
import type { Form } from '../useForm';

export const formInjectKey = Symbol();

export function provideForm(form: Form): void {
	provide(formInjectKey, form);
}

export function injectForm(): Form | undefined {
	return inject<Form>(formInjectKey);
}
