import { computed, reactive, ref, shallowRef, watch } from 'vue';
import { AsyncValidator, Validator } from './validators';

export interface UseFieldOptions {
	validators?: Validator[];
	asyncValidators?: AsyncValidator[];
}

export interface Field<T = any> {
	// v-model value
	value: T;

	// state
	invalid: boolean;
	valid: boolean;
	disabled: boolean;
	enabled: boolean;
	dirty: boolean;

	validators: Set<Validator>;
	errors: string[];

	// functions
	reset: () => void;
	disable: () => void;
	enable: () => void;
}

export function useField<T>(
	initialValue: T,
	options: UseFieldOptions = { validators: [], asyncValidators: [] }
): Field<T> {
	// This ref is used for v-model on form inputs
	const value = shallowRef(initialValue);
	const validators = ref(new Set<Validator>(options.validators));

	const errors = computed(() => {
		const ret: string[] = [];
		validators.value.forEach((validator) => {
			if (validator.validate(value.value)) ret.push(validator.name);
		});

		return ret;
	});

	const invalid = computed(() => errors.value.length > 0);
	const valid = computed(() => !invalid.value);

	const disabled = ref(false);
	const enabled = computed(() => !disabled.value);
	const disable = () => (disabled.value = true);
	const enable = () => (disabled.value = false);

	const dirty = ref(false);
	watch(value, () => {
		dirty.value = true;
	});

	const reset = () => {
		value.value = initialValue;
		disabled.value = false;
		dirty.value = false;
	};

	return reactive({
		// v-model value
		value,

		// state
		invalid,
		valid,
		disabled,
		enabled,
		dirty,

		errors,
		validators,

		// functions
		reset,
		disable,
		enable,
	});
}
