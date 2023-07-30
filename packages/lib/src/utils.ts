import type { Field } from './useField';
import type { Form } from './useForm';

export function getClassnames(formOrField: Form | Field): Record<string, boolean>[] {
	const { valid, invalid, pristine, dirty, pending } = formOrField;

	const ret = Object.entries({
		valid,
		invalid,
		pristine,
		dirty,
		pending,
		submitted: 'submitted' in formOrField ? formOrField.submitted : false,
	}).map(([key, value]) => ({
		[`v-${key}`]: value,
	}));

	return ret;
}
