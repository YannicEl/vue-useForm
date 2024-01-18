import { ComputedRef, computed, useAttrs } from 'vue';
import { injectForm } from '../composables/useFormInject';
import { Field } from '../useField';
import { getClassnames } from '../utils';

export function getFieldAndClasses(props: { field?: Field; fieldName?: string }): {
	field: ComputedRef<Field>;
	classes: ComputedRef<Record<string, string>>;
} {
	const field = computed(() => {
		if (props.field) return props.field;

		const attributes = useAttrs();
		const { name } = attributes;

		if (!name && !props.fieldName) {
			console.warn('Input has not name prop');
			return;
		}

		const form = injectForm();
		if (!form) {
			console.warn('Input is not inside a VForm component');
			return;
		}

		const field = form.fields[props.fieldName ?? name];

		if (!field) {
			console.warn(`Form has no field "${name}"`);
			return;
		}

		if ('values' in field) {
			console.warn('Field is actually a field group');
			return;
		}

		field.disabled = 'disabled' in attributes;

		return field;
	});

	const classes = computed(() => (field.value ? getClassnames(field.value) : {}));

	return { field, classes };
}
