// #region Validator
export type Validator<TValue = unknown> = {
	name: string;
	args?: any;
	validate: (value: TValue) => boolean;
};
// #endregion Validator

// #region AsyncValidator
export type AsyncValidator<TValue = unknown> = {
	name: string;
	args?: any;
	validate: (value: TValue) => Promise<boolean>;
};
// #endregion AsyncValidator

export function defineValidator<TReturn extends boolean | Promise<boolean>, TValue = unknown>(
	name: string,
	validate: (value: TValue) => TReturn
): TReturn extends boolean ? Validator : AsyncValidator {
	return {
		name,
		validate,
	} as any;
}

export function defineValidatorWithArgs<
	TArgs,
	TReturn extends boolean | Promise<boolean>,
	TValue = unknown,
>(
	name: string,
	validate: (value: TValue, args: TArgs) => TReturn
): TReturn extends boolean ? (args: TArgs) => Validator : (args: TArgs) => AsyncValidator {
	return (args: TArgs) => {
		return {
			name,
			args,
			validate: (value: TValue) => validate(value, args),
		} as any;
	};
}

export function isString(value: unknown): value is string {
	return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
	return typeof value === 'number';
}
