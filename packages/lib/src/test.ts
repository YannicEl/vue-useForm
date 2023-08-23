import { defineValidator, useForm } from './index';

const validator = defineValidator('global', (value) => {
	return !!value;
});

const form = useForm(
	{
		hallo: [''],
		zwallo: [0],
		drallo: [false],
	},
	{
		validators: [validator],
	}
);

console.log(form);
