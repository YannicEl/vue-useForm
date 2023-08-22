import type { BaseSchema as ValibotSchema } from 'valibot';
import type { Schema as ZodSchema } from 'zod';
import { defineValidator, defineValidatorWithArgs, isNumber, isString } from './utils';

export const required = defineValidator('required', (value) => !!value);

export const maxLength = defineValidatorWithArgs(
	'maxLength',
	(value, maxLength: number) => isString(value) && value?.length <= maxLength
);

export const minLength = defineValidatorWithArgs(
	'minLength',
	(value, minLength: number) => isString(value) && value?.length >= minLength
);

export const min = defineValidatorWithArgs(
	'min',
	(value, min: number) => isNumber(value) && value >= min
);

export const max = defineValidatorWithArgs(
	'max',
	(value, max: number) => isNumber(value) && value <= max
);

export const startsWith = defineValidatorWithArgs(
	'startsWith',
	(value, startsWith: string) =>
		isString(value) && value.toLocaleLowerCase().startsWith(startsWith.toLocaleLowerCase())
);

export const regex = defineValidatorWithArgs(
	'regex',
	(value, regex: RegExp) => isString(value) && regex.test(value)
);

// https://github.com/colinhacks/zod
const emailRegex =
	/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((?!-)([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})[^-<>()[\].,;:\s@"]$/i;

export const email = defineValidator('email', (value) => regex(emailRegex).validate(value));

// https://github.com/colinhacks/zod
const emojiRegex = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u;

export const emoji = defineValidator('emoji', (value) => regex(emojiRegex).validate(value));

export const zodValidator = defineValidatorWithArgs(
	'zodValidator',
	(value, schema: ZodSchema) => schema.safeParse(value).success
);

export const valibotValidator = defineValidatorWithArgs(
	'valibotValidator',
	(value, schema: ValibotSchema) => {
		try {
			return !!schema.parse(value);
		} catch (error) {
			console.log('hi');
			return false;
		}
	}
);
