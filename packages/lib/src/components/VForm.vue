<template>
	<form @submit.prevent="onSubmit" :class="classNames">
		<slot />
	</form>
</template>

<script setup lang="ts" generic="T">
import type { Form } from '../useForm';
import { provideForm } from '../composables/useFormInject';
import { getClassnames } from '../utils';
import { computed } from 'vue';

const { form } = defineProps<{
	form: Form<T>;
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
