<template>
	<UForm :form="form" @v-submit="onSubmit">
		<UField>
			Email:
			<input type="email" name="email" />
		</UField>

		<div>
			<span v-for="error in form.fields.email.errors">{{ error }}</span>
		</div>

		<UField>
			Password:
			<input type="password" name="password" />
		</UField>

		<button>Submit</button>
	</UForm>
</template>

<script setup>
import { UField, UForm, email, minLength, required, useForm } from '@vuetils/form';

const form = useForm({
	email: ['', [required, email]],
	password: ['', [required, minLength(6)]],
});
</script>
