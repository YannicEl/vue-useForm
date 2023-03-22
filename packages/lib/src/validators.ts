export type Validator = {
	name: string;
	validate: (value: unknown) => boolean;
};

export type ValidatorGenerator = (...params: any[]) => Validator;

export type AsyncValidator = {
	name: string;
	validate: (value: unknown) => Promise<boolean>;
};

export type AsyncValidatorGenerator = (...params: any[]) => AsyncValidator;

function isString(value: unknown): value is string {
	return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
	return typeof value === 'number';
}

export const required: Validator = {
	name: 'required',
	validate: (value) => !!value,
};

export const maxLength: ValidatorGenerator = (maxLength: number) => {
	return {
		name: 'maxLength',
		validate: (value) => isString(value) && value?.length <= maxLength,
	};
};

export const minLength: ValidatorGenerator = (minLength: number) => {
	return {
		name: 'minLength',
		validate: (value) => isString(value) && value?.length >= minLength,
	};
};

export const min: ValidatorGenerator = (min: number) => {
	return {
		name: 'min',
		validate: (value) => isNumber(value) && value >= min,
	};
};

export const max: ValidatorGenerator = (max: number) => {
	return {
		name: 'max',
		validate: (value) => isNumber(value) && value <= max,
	};
};

export const startWith: ValidatorGenerator = (startsWith: string) => {
	return {
		name: 'startWith',
		validate: (value) =>
			isString(value) &&
			value.toLocaleLowerCase().startsWith(startsWith.toLocaleLowerCase()),
	};
};

export const regex: ValidatorGenerator = (regex: RegExp) => {
	return {
		name: 'regex',
		validate: (value) => isString(value) && regex.test(value),
	};
};

// https://github.com/colinhacks/zod
const emailRegex =
	/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((?!-)([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})[^-<>()[\].,;:\s@"]$/i;

export const email: Validator = {
	name: 'email',
	validate: (value) => regex(emailRegex).validate(value),
};

// https://github.com/colinhacks/zod
const emojiRegex = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u;

export const emoji: Validator = {
	name: 'emoji',
	validate: (value) => regex(emojiRegex).validate(value),
};
