<template>
	<UForm :form="form">
		<UField class="flex flex-col">
			Label
			<input type="text" name="field" />
		</UField>
	</UForm>
</template>

<script setup>
import { UField, UForm, useForm } from '@vuetils/form';

const form = useForm({
	field: [''],
});
</script>
