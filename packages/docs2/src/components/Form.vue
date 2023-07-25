<template>
	<form
		@submit.prevent="onSubmit"
		:class="{
			valid,
			invalid,
			submitted,
		}"
	>
		<slot :form="form"></slot>
	</form>
</template>

<script setup lang="ts" generic="T">
import { Form } from '@yannicel/vue-useform';

const { form } = defineProps<{
	form: Form<T>;
}>();

const emits = defineEmits<{
	(e: 'vSubmit', values: typeof form.values): void;
}>();

provideForm(form);

const { valid, invalid, submitted } = toRefs(form);

function onSubmit() {
	form.submitted = true;
	emits('vSubmit', form.values);
}
</script>
