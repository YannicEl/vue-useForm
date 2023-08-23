<template>
	<UForm :form="form">
		<UField>
			Text
			<input type="text" name="text" />
		</UField>

		<UField>
			Radio 1
			<input type="radio" name="radio" value="1" />
		</UField>

		<UField>
			Radio 2
			<input type="radio" name="radio" value="2" />
		</UField>

		<UField>
			Radio 3
			<input type="radio" name="radio" value="3" />
		</UField>

		<UField v-for="(value, index) of checkboxValues">
			Checkbox {{ index + 1 }}
			<input type="checkbox" name="checkbox" :value="value" />
		</UField>

		<UField>
			Select
			<select name="select">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
			</select>
		</UField>

		<UField>
			Textarea
			<textarea name="textarea"></textarea>
		</UField>
	</UForm>

	<pre>
    {{ form.values }}
  </pre>

	<pre>
    {{ form.syncErrors }}
  </pre>
</template>

<script setup lang="ts">
import { UField, UForm, useForm } from '@vuetils/form';

const checkboxValues = ['1', '2', '3'] as const;

const form = useForm({
	text: ['Hallo'],
	radio: ['2'],
	checkbox: [['2'] as unknown as Test],
	select: ['2'],
	textarea: ['Zwallo'],
});
</script>
