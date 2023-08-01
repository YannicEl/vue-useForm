<template>
	<VForm :form="form">
		<VLabel class="flex flex-col">
			Label
			<input type="text" name="field" />
		</VLabel>
	</VForm>
</template>

<script setup lang="ts">
import { VForm, VLabel, useForm } from '@vuetils/form';

const form = useForm({
	field: [''],
});
</script>
