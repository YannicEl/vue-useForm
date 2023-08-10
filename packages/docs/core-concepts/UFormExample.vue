<template>
	<UForm :form="form">
		<UField>
			Firstname:
			<input name="firstname" type="text" required />
		</UField>

		<UField>
			Lastname:
			<input name="lastname" type="text" required />
		</UField>

		<button>Submit</button>
	</UForm>
</template>

<script setup>
import { UField, UForm, required, useForm } from '@vuetils/form';

const form = useForm({
	firstname: ['', [required]],
	lastname: ['', [required]],
});
</script>
