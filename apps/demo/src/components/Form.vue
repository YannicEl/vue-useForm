<template>
	<form
		@submit.prevent="onSubmit"
		:class="{
			valid,
			invalid,
			submitted,
		}"
	>
		<slot></slot>
	</form>
</template>

<script lang="ts" setup>
import { Form } from '@yannicel/vue-useform';

const { form } = defineProps<{
	form: Form;
}>();

const { valid, invalid, submitted } = toRefs(form);

function onSubmit() {
	form.submitted = true;
}
</script>
