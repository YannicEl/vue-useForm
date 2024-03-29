import { computed, reactive, ref, shallowRef, watch } from 'vue';
import { AsyncValidator, Validator, required } from './validators';

export interface UseFieldOptions {
	validators?: Validator[];
	asyncValidators?: AsyncValidator[];
}

// #region Field
export interface Field<T = any> {
	// v-model value
	value: T;

	// state
	valid: boolean;
	invalid: boolean;
	enabled: boolean;
	disabled: boolean;
	pristine: boolean;
	dirty: boolean;
	async: boolean;
	untouched: boolean;
	touched: boolean;
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
// #endregion Field

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
	watch(
		value,
		async (value) => {
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
		},
		{ immediate: true }
	);

	// combine async and sync errors
	const errors = computed(() => [...syncErrors.value, ...asyncErrors.value]);

	const invalid = computed(() => {
		if (value.value === initialValue && !validators.value.has(required)) {
			return false;
		} else {
			return errors.value.length > 0;
		}
	});
	const valid = computed(() => !invalid.value);

	const disabled = ref(false);
	const enabled = computed(() => !disabled.value);
	const disable = () => (disabled.value = true);
	const enable = () => (disabled.value = false);

	const dirty = computed(() => value.value !== initialValue);
	const pristine = computed(() => !dirty.value);

	const touched = ref(false);
	const untouched = computed(() => !touched.value);

	function reset(): void {
		value.value = initialValue;
		disabled.value = false;
		touched.value = false;
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
		valid,
		invalid,
		enabled,
		disabled,
		pristine,
		dirty,
		async,
		untouched,
		touched,
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
