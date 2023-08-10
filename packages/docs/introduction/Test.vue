<template>
	<UForm :form="form" class="flex flex-col gap-4" @submit="onSubmit" @v-submit="onVSubmit">
		<UField>
			Label {{ form.fields.test.value }}
			<input type="text" name="test" required />
		</UField>

		<UField fieldName="select">
			Select
			<select name="select2">
				<option value="hallo">hallo</option>
				<option value="zwallo">zwallo</option>
				<option value="drallo">drallo</option>
			</select>
		</UField>

		<button>submit</button>
	</UForm>

	<UField :field="form.fields.test2" class="flex flex-col mt-4">
		Label1
		<input type="text" name="test2" disabled required />
	</UField>

	<button @click="form.disabled ? form.enable() : form.disable()">
		{{ form.disabled ? 'enable' : 'disable' }}
	</button>

	<pre class="mt-6">
    {{ form.values }}
  </pre>
</template>

<script setup lang="ts">
import {
	UField,
	UForm,
	definePlugin,
	email,
	localStoragePlugin,
	minLength,
	required,
	useForm,
} from '@vuetils/form';

const form2 = useForm(
	{
		email: ['', [required, email]],
		password: ['', [required, minLength(6)]],
	},
	{
		plugins: [localStoragePlugin('some-key')],
	}
);

const form = useForm({
	test: ['hallo', [required]],
	test2: [''],
	select: ['drallo'],
});

const plugin = definePlugin((form, args) => {
	console.log(args);
	console.log(form);
});

form.addPlugin(plugin({ hello: 'world' }));

function onSubmit() {
	console.log('on submit');
}

function onVSubmit() {
	console.log('on v submit');
}
</script>

<style></style>
