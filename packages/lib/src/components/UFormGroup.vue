<template>
	<slot />
</template>

<script setup lang="ts">
import { provideForm } from '../composables/useFormInject';
import type { Form } from '../useForm';

const { form } = defineProps<{
	form: Form;
}>();

provideForm(form);
</script>
