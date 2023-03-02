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
			<FormInput :field="form.fields.firstname" v-slot="props">
				<label for="firstname">Firstname:</label>
				<input v-bind="props" id="firstname" name="firstname" type="text" />
			</FormInput>

			<!-- 
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
			</label> -->

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
	required,
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
	firstname: ['', [required], [asyncValidator]],
	// email: ['', [required, email]],
	// count: [0, [min(2)]],
	// radio: ['', [required]],
	// select: ['', [required]],
	// checkbox: ['', []],
});

function onSubmit() {
	const { firstname } = form.values;
	console.log({ firstname });
}
</script>

<style scoped></style>
