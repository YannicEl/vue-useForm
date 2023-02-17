import {
	computed,
	ComputedRef,
	reactive,
	Ref,
	ref,
	ShallowRef,
	shallowRef,
	UnwrapNestedRefs,
} from 'vue';
import { Validator } from './validators';

export type FormOptions<T> = {
	[Key in keyof T]: [initialValue: T[Key], validators?: Validator[]];
};

type Values<T> = {
	[Key in keyof T]: Ref<T[Key]>;
};

type Fields<T> = {
	[Key in keyof T]: {
		value: ShallowRef<T[Key]>;
		hasError: ComputedRef<boolean>;
		errors: ComputedRef<string[]>;
	};
};

export type Return<T> = {
	values: Values<T>;
	fields: Fields<T>;
	isValid: ComputedRef<boolean>;
	submitted: Ref<boolean>;
	setValues: (values: Partial<{ [Key in keyof T]: T[Key] }>) => void;
	reset: () => void;
};

export function useForm<T>(options: FormOptions<T>): UnwrapNestedRefs<Return<T>> {
	const fields: Fields<T> = {} as any;
	const values: Values<T> = {} as any;

	for (const key in options) {
		const [initialValue, validators = []] = options[key];

		// This ref is used for v-model on form inputs
		const value = shallowRef(initialValue);

		const errors = computed(() => {
			const ret: string[] = [];
			validators.forEach((validator) => {
				if (!validator.validate(value.value)) ret.push(validator.name);
			});

			return ret;
		});

		const hasError = computed(() => {
			// If a field is not required and empty it cannot have errors
			if (!errors.value.includes('required') && value?.value === '') {
				return false;
			} else {
				return errors.value.length > 0;
			}
		});

		values[key] = value;
		fields[key] = { value, hasError, errors };
	}

	// Checks if all fields in the form are valid
	const isValid = computed(() => {
		let isValid = true;
		for (const key in fields) {
			const { hasError } = fields[key];
			if (isValid) {
				isValid = !hasError.value;
			}
		}
		return isValid;
	});

	const setValues = (setValues: Partial<{ [Key in keyof T]: T[Key] }>) => {
		for (const key in setValues) {
			const value = setValues[key];
			values[key].value = value!;
		}
	};

	const submitted = ref(false);

	// Reset the form back to initial state
	const reset = () => {
		submitted.value = false;
		for (const key in values) {
			const [initialValue] = options[key];
			values[key].value = initialValue;
		}
	};

	const ret = {
		isValid,
		values,
		fields,
		submitted,
		setValues,
		reset,
	};

	return reactive(ret);
}
