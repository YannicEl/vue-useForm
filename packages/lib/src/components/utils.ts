import { ComputedRef, computed, useAttrs } from 'vue';
import { injectForm } from '../composables/useFormInject';
import { Field } from '../useField';
import { getClassnames } from '../utils';

export type CustomInputProps = {
	field?: Field;
	fieldName?: string;
};

export function getFieldAndClasses(props: CustomInputProps): {
	field: ComputedRef<Field | undefined>;
	classes: ComputedRef<Record<string, string>>;
} {
	const field = computed(() => {
		if (props.field) return props.field;

		const { name, disabled } = useAttrs();

		if (!props.fieldName && typeof name !== 'string') {
			console.warn('Input has not name prop');
			return;
		}

		const form = injectForm();
		if (!form) {
			console.warn('Input is not inside a VForm component');
			return;
		}

		const field = form.fields[props.fieldName ?? (name as string)];

		if (!field) {
			console.warn(`Form has no field "${name}"`);
			return;
		}

		if ('values' in field) {
			console.warn('Field is actually a field group');
			return;
		}

		field.disabled = !!disabled;

		return field;
	});

	const classes = computed(() => (field.value ? getClassnames(field.value) : {}));

	return { field, classes };
}
