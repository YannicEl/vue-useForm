import { computed, reactive, ref, shallowRef, watch } from 'vue';
import { AsyncValidator, required, Validator } from './validators';

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
	async: boolean;
	pending: boolean;

	// Validators and errors
	validators: Set<Validator>;
	asyncValidators: Set<AsyncValidator>;
	errors: string[];

	// functions
	reset: () => void;
	disable: () => void;
	enable: () => void;
	awaitValidation: () => Promise<void>;
}

export function useField<T>(
	initialValue: T,
	options: UseFieldOptions = { validators: [], asyncValidators: [] }
): Field<T> {
	// This ref is used for v-model on form inputs
	const value = shallowRef(initialValue);
	const validators = ref(new Set<Validator>(options.validators));
	const asyncValidators = ref(new Set<AsyncValidator>(options.asyncValidators));

	const syncErrors = computed(() => {
		const ret: string[] = [];
		validators.value.forEach((validator) => {
			const isValid = validator.validate(value.value);
			if (!isValid) ret.push(validator.name);
		});

		return ret;
	});

	const async = computed(() => asyncValidators.value.size > 0);
	const pending = ref(false);
	const asyncErrors = ref<string[]>([]);
	watch(value, async (value) => {
		if (asyncValidators.value.size === 0) return;

		pending.value = true;

		const errors = await Promise.all(
			Array.from(asyncValidators.value).map(async (validator) => {
				const isValid = await validator.validate(value);
				if (!isValid) return validator.name;
			})
		);

		asyncErrors.value = errors.filter(Boolean) as string[];
		pending.value = false;
	});

	// combine async and sync errors
	const errors = computed(() => [...syncErrors.value, ...asyncErrors.value]);

	const invalid = computed(() => {
		if (value.value === initialValue && !validators.value.has(required)) {
			return false;
		} else {
			errors.value.length > 0;
		}
	});
	const valid = computed(() => !invalid.value);

	const disabled = ref(false);
	const enabled = computed(() => !disabled.value);
	const disable = () => (disabled.value = true);
	const enable = () => (disabled.value = false);

	const dirty = ref(false);
	watch(value, () => {
		dirty.value = true;
	});

	function reset(): void {
		value.value = initialValue;
		disabled.value = false;
		dirty.value = false;
	}

	async function awaitValidation(): Promise<void> {
		if (!pending.value) return;

		return new Promise((resolve) => {
			const unwatch = watch(pending, (pending) => {
				if (!pending) {
					unwatch();
					resolve();
				}
			});
		});
	}

	return reactive({
		// v-model value
		value,

		// state
		invalid,
		valid,
		disabled,
		enabled,
		dirty,
		async,
		pending,

		errors,
		validators,
		asyncValidators,

		// functions
		reset,
		disable,
		enable,
		awaitValidation,
	});
}
