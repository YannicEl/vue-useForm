<template>
	<UForm :form="form">
		<UField>
			Email: // errors: [{{ form.fields.email.errors.join(', ') }}] state: [{{
				getStateClasses(form.fields.email)
			}}]
			<input type="email" name="email" required />
		</UField>

		<UField>
			Password: // errors: [{{ form.fields.password.errors.join(', ') }}] state: [{{
				getStateClasses(form.fields.password)
			}}]
			<input type="password" name="password" required />
		</UField>

		<button>Submit</button>

		<button type="button" @click="form.reset()">Reset Form</button>
	</UForm>
</template>

<script setup>
import { UField, UForm, email, minLength, required, useForm } from '@vuetils/form';

const form = useForm({
	email: ['', [required, email]],
	password: ['', [required, minLength(6)]],
});

function getStateClasses(field) {
	const ret = [];

	if (field.valid) ret.push('valid');
	if (field.invalid) ret.push('invalid');
	if (field.pristine) ret.push('pristine');
	if (field.dirty) ret.push('dirty');

	return ret.join(', ');
}
</script>
