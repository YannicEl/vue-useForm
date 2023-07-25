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
import { toRefs } from 'vue';
import type { Form } from '../useForm';
import { provideForm } from '../composables/useFormInject';

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
