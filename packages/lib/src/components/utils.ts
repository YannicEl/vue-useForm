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
	validationAttrs: ComputedRef<Record<string, number | boolean>>;
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

	const validationAttrs = computed(() => {
		const temp = Array.from(field.value?.validators ?? []);

		return {
			required: !!temp.find((validator) => validator.name === 'required') ?? null,
			min: temp.find((validator) => validator.name === 'min')?.args ?? null,
			max: temp.find((validator) => validator.name === 'max')?.args ?? null,
			minLength: temp.find((validator) => validator.name === 'minLength')?.args ?? null,
			maxLength: temp.find((validator) => validator.name === 'maxLength')?.args ?? null,
		};
	});

	return { field, classes, validationAttrs };
}
