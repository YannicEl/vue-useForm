import { defineValidatorWithArgs } from '@vuetils/form';

const validator = defineValidatorWithArgs('my-validator', (value, shouldBe: string) => {
	// do some validating
	return typeof value === shouldBe;
});
