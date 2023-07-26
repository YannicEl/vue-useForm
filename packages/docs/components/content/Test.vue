<template>
	<VForm :form="form">
		<FormGroup>
			<input type="text" name="test" />
		</FormGroup>
	</VForm>

	<pre
		>{{ form.values }}
  </pre>
</template>

<script setup lang="ts">
import { VForm, useForm, FormGroup } from '@vuetils/form';

const form = useForm({
	test: [''],
});
</script>
