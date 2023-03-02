<template>
	<div class="w-screen-md mx-auto">
		<h1 class="mt-20">Demo</h1>

		<!-- <label class="mt-6">
			<div>Field:</div>
			<input type="text" v-model="field.value" />
		</label>

		<button @click="add">Add validator</button>
		<button @click="remove">Remove validator</button>

		<pre>
      {{ field }}
    </pre> -->

		<Form :form="form" @submit.prevent="onSubmit" class="mt-6 grid gap-4">
			<label for="firstname">
				<div>Firstname:</div>
				<FormInput id="firstname" type="text" :field="form.fields.firstname" />
			</label>

			<label for="email">
				<div>Email:</div>
				<FormInput id="email" type="email" :field="form.fields.email" />
			</label>

			<label for="count">
				<div>Count:</div>
				<FormInput id="count" type="number" :field="form.fields.count" />
			</label>

			<div class="flex">
				<label for="o1" class="flex gap-2">
					<div class="flex-shrink-0">Option 1</div>
					<FormInput
						id="o1"
						type="radio"
						name="radio"
						value="Option 1"
						:field="form.fields.radio"
					/>
				</label>

				<label for="o2" class="flex gap-2">
					<div class="flex-shrink-0">Option 2</div>
					<FormInput
						id="o2"
						type="radio"
						name="radio"
						value="Option 2"
						:field="form.fields.radio"
					/>
				</label>

				<label for="o3" class="flex gap-2">
					<div class="flex-shrink-0">Option 3</div>
					<FormInput
						id="o3"
						type="radio"
						name="radio"
						value="Option 3"
						:field="form.fields.radio"
					/>
				</label>
			</div>

			<label for="select">
				<div>Select:</div>
				<FormSelect :field="form.fields.select">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</FormSelect>
			</label>

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
	email,
	min,
	required,
	storagePlugin,
	useField,
	useForm,
} from '@yannicel/vue-useform';

const field = useField('initial', { validators: [required] });

function add() {
	field.validators.add(email);
}

function remove() {
	field.validators.delete(email);
}

const form = useForm(
	{
		firstname: ['', [required]],
		email: ['', [required, email]],
		count: [0, [min(2)]],
		radio: ['', [required]],
		select: ['', [required]],
		checkbox: ['', []],
	},
	{ plugins: [storagePlugin({ key: 'test' })] }
);

function onSubmit() {
	const { firstname, email, count, radio, select, checkbox } = form.values;
	console.log({ firstname, email, count, radio, select, checkbox });
}
</script>

<style scoped></style>
