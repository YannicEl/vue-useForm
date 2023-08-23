import type { Field } from './useField';
import type { Form } from './useForm';

export function getClassnames(formOrField: Form | Field): Record<string, boolean>[] {
	const { valid, invalid, pristine, dirty, pending, untouched, touched } = formOrField;

	const isForm = 'submitted' in formOrField;

	const ret = Object.entries({
		valid,
		invalid,
		pristine,
		dirty,
		pending,
		untouched,
		touched,
		submitted: isForm ? formOrField.submitted : false,
		input: !isForm,
		form: isForm,
	}).map(([key, value]) => ({
		[`v-${key}`]: value,
	}));

	return ret;
}
