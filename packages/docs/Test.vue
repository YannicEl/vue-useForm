<template>
	<VForm :form="form" class="flex flex-col gap-4" @submit="onSubmit" @v-submit="onVSubmit">
		<VLabel class="flex flex-col">
			Label {{ form.fields.test.value }}
			<input type="text" name="test" required />
		</VLabel>

		<VLabel fieldName="select" class="flex flex-col">
			Select
			<select name="select2">
				<option value="hallo">hallo</option>
				<option value="zwallo">zwallo</option>
				<option value="drallo">drallo</option>
			</select>
		</VLabel>

		<button>submit</button>
	</VForm>

	<VLabel :field="form.fields.test2" class="flex flex-col mt-4">
		Label
		<input type="text" name="test2" disabled required />
	</VLabel>

	<button @click="form.disabled ? form.enable() : form.disable()">
		{{ form.disabled ? 'enable' : 'disable' }}
	</button>

	<pre class="mt-6"
		>{{ form.values }}
  </pre>
</template>

<script setup lang="ts">
import { required } from '@vuetils/form';
import { VForm, useForm, VLabel } from '@vuetils/form';

const form = useForm({
	test: ['', [required]],
	test2: [''],
	select: ['drallo'],
});

function onSubmit() {
	console.log('on submit');
}

function onVSubmit() {
	console.log('on v submit');
}
</script>

<style></style>
