import { defineValidator, useField, useForm } from '@vuetils/form';

const syncValidator = defineValidator('sync', (value) => true);
const asyncValidator = defineValidator('async', async (value) => true);

const form = useForm({
	field: ['', [syncValidator], [asyncValidator]],
});

const field = useField('', {
	validators: [syncValidator],
	asyncValidators: [asyncValidator],
});
