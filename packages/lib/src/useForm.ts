import { computed, ComputedRef, reactive, ref, UnwrapRef, watch } from 'vue';
import { Plugin } from './plugins';
import { Field, useField } from './useField';
import { AsyncValidator, Validator } from './validators';

/// #region Form
export interface Form<T = any> {
	values: UnwrapRef<Values<T>>;
	fields: UnwrapRef<Fields<T>>;

	/**
	 * State
	 */
	invalid: boolean;
	valid: boolean;
	disabled: boolean;
	enabled: boolean;
	pending: boolean;
	dirty: boolean;
	pristine: boolean;
	submitted: boolean;

	// functions
	setValues: (values: Partial<{ [Key in keyof T]: T[Key] }>) => void;
	reset: () => void;
	disable: () => void;
	enable: () => void;
	awaitValidation: () => Promise<void>;
	addPlugin: (plugin: Plugin) => void;
}
/// #endregion Form

export type Values<T> = {
	[Key in keyof T]: ComputedRef<T[Key]>;
};

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
export type UseFormOptions = {
	plugins: Plugin[];
};
// #endregion UseFormOptions

// #region useForm
export function useForm<T>(
	fieldOptions: FieldOptions<T>,
	options: UseFormOptions = { plugins: [] }
): Form<T> {
	const fields: Fields<T> = {} as any;
	const values: Values<T> = reactive({}) as any;

	for (const key in fieldOptions) {
		const [initialValue, validators = [], asyncValidators = []] = fieldOptions[key];

		const field = useField(initialValue, { validators, asyncValidators });

		values[key] = computed(() => field.value);
		fields[key] = field;
	}

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

	function disable() {
		for (const key in fields) {
			fields[key].disable();
		}
	}

	function enable() {
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

	function addPlugin(plugin: Plugin) {
		plugin(form);
	}

	const form: Form<T> = reactive({
		values,
		fields,

		// state
		invalid,
		valid,
		disabled,
		enabled,
		dirty,
		pristine,
		pending,
		submitted,

		// functions
		reset,
		disable,
		enable,
		setValues,
		awaitValidation,
		addPlugin,
	});

	options.plugins.forEach((plugin) => plugin(form));

	return form;
}
// #endregion useForm
