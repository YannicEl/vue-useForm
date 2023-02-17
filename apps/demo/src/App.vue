<template>
	<form @submit.prevent="submit">
		<label for="firstname">
			Firstname:
			<input id="firstname" type="text" v-model="form.fields.firstname.value" />
		</label>

		<label for="email">
			Email:
			<input id="email" type="email" v-model="form.fields.email.value" />
		</label>

		<label for="count">
			Count:
			<input id="count" type="number" v-model="form.fields.count.value" />
		</label>

		<button>Submit</button>
	</form>

	<pre>
    {{ form }}
  </pre>
</template>

<script setup lang="ts">
import { email, min, required, useForm } from 'vue-useform';

const form = useForm({
	firstname: ['', [required]],
	email: ['', [required, email]],
	count: [0, [min(2)]],
});

function submit() {
	const { firstname, email, count } = form.values;
	console.log({ firstname, email, count });
}
</script>

<style scoped>
form {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

form input {
	width: 100%;
}

form button {
	width: 100%;
}
</style>
