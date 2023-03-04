<template>
	<select
		v-model="field.value"
		:class="{
			valid,
			invalid,
			disabled,
			enabled,
			dirty,
		}"
	>
		<slot></slot>
	</select>
</template>

<script lang="ts" setup>
import { Field } from '@yannicel/vue-useform';

const { field } = defineProps<{
	field: Field;
}>();

const { valid, invalid, disabled, enabled, dirty } = toRefs(field);
</script>

<style lang="scss" scoped></style>
