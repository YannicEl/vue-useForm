<template>
	<form @submit.prevent="onSubmit" :class="classNames">
		<slot />
	</form>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { provideForm } from '../composables/useFormInject';
import type { Form } from '../useForm';
import { getClassnames } from '../utils';

const { form } = defineProps<{
	form: Form;
}>();

const emits = defineEmits<{
	(e: 'vSubmit', values: typeof form.values): void;
}>();

provideForm(form);

const classNames = computed(() => getClassnames(form));

function onSubmit() {
	form.submitted = true;
	emits('vSubmit', form.values);
}
</script>
