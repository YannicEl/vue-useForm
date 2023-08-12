// #region Validator
export type Validator = {
	name: string;
	validate: (value: unknown) => boolean;
};
// #endregion Validator

// #region AsyncValidator
export type AsyncValidator = {
	name: string;
	validate: (value: unknown) => Promise<boolean>;
};
// #endregion AsyncValidator

export function defineValidator<TReturn extends boolean | Promise<boolean>>(
	name: string,
	validate: (value: unknown) => TReturn
): TReturn extends boolean ? Validator : AsyncValidator {
	return {
		name,
		validate,
	} as any;
}

export function defineValidatorWithArgs<Targs, TReturn extends boolean | Promise<boolean>>(
	name: string,
	validate: (value: unknown, args: Targs) => TReturn
): TReturn extends boolean ? (args: Targs) => Validator : (args: Targs) => AsyncValidator {
	return (args: Targs) => {
		return {
			name,
			validate: (value: unknown) => validate(value, args),
		} as any;
	};
}

export function isString(value: unknown): value is string {
	return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
	return typeof value === 'number';
}
