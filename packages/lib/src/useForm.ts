import { computed, ComputedRef, reactive, ref, UnwrapRef, watch } from 'vue';
import { Plugin } from './plugins';
import { Field, useField } from './useField';
import { AsyncValidator, Validator } from './validators';

// #region Form
export interface Form<T = any> {
	values: UnwrapRef<Values<T>>;
	fields: UnwrapRef<Fields<T>>;

	/**
	 * State
	 */
	valid: boolean;
	invalid: boolean;
	enabled: boolean;
	disabled: boolean;
	pristine: boolean;
	dirty: boolean;
	untouched: boolean;
	touched: boolean;
	pending: boolean;
	submitted: boolean;

	// Validators and errors
	validators: Set<Validator<UnwrappedValues<T>>>;
	asyncValidators: Set<AsyncValidator<UnwrappedValues<T>>>;
	errors: string[];

	// functions
	setValues: (values: Partial<{ [Key in keyof T]: T[Key] }>) => void;
	reset: () => void;
	disable: () => void;
	enable: () => void;
	awaitValidation: () => Promise<void>;
	addPlugin: (plugin: Plugin) => void;
}
// #endregion Form

export type Values<T> = {
	[Key in keyof T]: ComputedRef<T[Key]>;
};

export type UnwrappedValues<T> = UnwrapRef<Values<T>>;

export type Fields<T> = {
	[Key in keyof T]: Field<T[Key]>;
};

// #region FieldOptions
export type FieldOptions<T> = {
	[Key in keyof T]: [
		initialValue: T[Key],
		validators?: Validator[],
		asyncValidators?: AsyncValidator[],
	];
};
// #endregion FieldOptions

// #region UseFormOptions
export type UseFormOptions<T> = {
	plugins?: Plugin[];
	validators?: Validator<UnwrappedValues<T>>[];
	asyncValidators?: AsyncValidator<UnwrappedValues<T>>[];
};
// #endregion UseFormOptions

// #region useForm
export function useForm<T>(
	fieldOptions: FieldOptions<T>,
	options: UseFormOptions<T> = {}
): Form<T> {
	const fields: Fields<T> = {} as any;
	const values: Values<T> = reactive({}) as any;

	for (const key in fieldOptions) {
		const [initialValue, validators = [], asyncValidators = []] = fieldOptions[key];

		const field = useField(initialValue, { validators, asyncValidators });

		values[key] = computed(() => field.value);
		fields[key] = field;
	}

	const validators = ref(new Set<Validator<UnwrappedValues<T>>>(options.validators));
	const asyncValidators = ref(new Set<AsyncValidator<UnwrappedValues<T>>>(options.asyncValidators));

	const syncErrors = computed(() => {
		const ret: string[] = [];
		validators.value.forEach((validator) => {
			const isValid = validator.validate(values as any);
			if (!isValid) ret.push(validator.name);
		});

		return ret;
	});

	const asyncErrors = ref<string[]>([]);

	// combine async and sync errors
	const errors = computed(() => [...syncErrors.value, ...asyncErrors.value]);

	// Checks if all fields in the form are valid
	const invalid = computed(() => {
		let invalid = false;
		for (const key in fields) {
			if (!invalid) invalid = fields[key].invalid;
		}
		return invalid;
	});
	const valid = computed(() => !invalid.value);

	const setValues = (setValues: Partial<{ [Key in keyof T]: T[Key] }>) => {
		for (const key in setValues) {
			const value = setValues[key];
			fields[key].value = value!;
		}
	};

	const submitted = ref(false);

	const pending = computed(() => {
		let pending = false;
		for (const key in fields) {
			if (!pending) pending = fields[key].pending;
		}

		return pending;
	});

	const disabled = computed(() => {
		let disabled = false;
		for (const key in fields) {
			if (!disabled) disabled = fields[key].disabled;
		}

		return disabled;
	});
	const enabled = computed(() => !disabled.value);

	const dirty = computed(() => {
		let dirty = false;
		for (const key in fields) {
			if (!dirty) dirty = fields[key].dirty;
		}

		return dirty;
	});
	const pristine = computed(() => !dirty.value);

	const touched = computed(() => {
		let touched = false;
		for (const key in fields) {
			if (!touched) touched = fields[key].touched;
		}

		return touched;
	});
	const untouched = computed(() => !touched.value);

	function disable(): void {
		for (const key in fields) {
			fields[key].disable();
		}
	}

	function enable(): void {
		for (const key in fields) {
			fields[key].enable();
		}
	}

	// Reset the form back to initial state
	function reset(): void {
		submitted.value = false;
		for (const key in fields) {
			fields[key].reset();
		}
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

	function addPlugin(plugin: Plugin<Form<T>>): void {
		plugin(form);
	}

	options.plugins?.forEach((plugin) => plugin(form));

	const form: Form<T> = reactive({
		values,
		fields,

		// state
		valid,
		invalid,
		enabled,
		disabled,
		pristine,
		dirty,
		pending,
		untouched,
		touched,
		submitted,

		validators,
		asyncValidators,
		errors,

		// functions
		reset,
		disable,
		enable,
		setValues,
		awaitValidation,
		addPlugin,
	});

	return form;
}
// #endregion useForm
