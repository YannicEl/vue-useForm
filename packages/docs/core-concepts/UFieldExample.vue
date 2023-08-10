<template>
	<UField :field="field">
		Label:
		<input name="field" type="text" required />
	</UField>
</template>

<script setup>
import { UField, required, useField } from '@vuetils/form';

const field = useField('', { validators: [required] });
</script>
