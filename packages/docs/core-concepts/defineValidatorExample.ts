import { defineValidator } from '@vuetils/form';

const validator = defineValidator('my-validator', (value) => {
	// do some validating
	return typeof value === 'string' && value.length > 0;
});
