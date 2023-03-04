<template>
	<div class="relative">
		<slot
			:class="{
				valid,
				invalid,
				disabled,
				enabled,
				dirty,
			}"
			:value="field.value"
			@input="onInput"
			:disabled="disabled"
		></slot>
	</div>
</template>

<script lang="ts" setup>
import { Field } from '@yannicel/vue-useform';

const { field } = defineProps<{
	field: Field;
}>();

const { valid, invalid, disabled, enabled, dirty } = toRefs(field);

function onInput(e: Event) {
	field.value = (e.target as HTMLInputElement).value;
}
</script>

<style lang="scss" scoped></style>
