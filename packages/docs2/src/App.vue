<template>
	<div class="w-screen-md mx-auto">
		<h1 class="mt-20">Demo</h1>

		<UButton text="hiii"></UButton>

		<Form :form="form" @vSubmit="customSubmit" class="mt-6 grid gap-4">
			<FormGroup>
				Firstname:
				<input name="firstname" type="text" />
			</FormGroup>

			<button type="button" @click="form.fields.firstname.value = 'ouch'">help</button>

			<!-- <FormGroup>
				Email:
				<input name="email" type="email" />
			</FormGroup> -->

			<button>Submit</button>
		</Form>

		<pre>
    {{ form }}
  </pre
		>
	</div>
</template>

<script setup lang="ts">
import {
	AsyncValidator,
	email,
	max,
	maxLength,
	min,
	minLength,
	required,
	useField,
	useForm,
} from '@vuetils/vue-useform';

import { UButton, add as add2 } from '@vuetils/form';

console.log(add2(1, 2));

const field = useField('initial', { validators: [required] });

const formControlName = ref('firstname');

function add() {
	field.validators.add(email);
}

function remove() {
	field.validators.delete(email);
}

function timeout(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
}

const asyncValidator: AsyncValidator = {
	name: 'asyncError',
	validate: async (value) => {
		await timeout(1000);
		return typeof value === 'string' && value.length < 4;
	},
};

const form = useForm({
	firstname: ['initial value', [min(1), max(10), minLength(5), maxLength(15)], [asyncValidator]],
	// email: ['initial value', [required, email]],
	// count: [0, [min(2)]],
	// radio: ['two', [required]],
	// select: ['', [required]],
	// checkbox: ['', []],
});

function customSubmit(values: typeof form.values) {
	console.log('custom submit');
	console.log(values);
}
</script>

<style scoped></style>
