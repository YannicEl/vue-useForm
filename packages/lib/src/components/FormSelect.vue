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
import { toRefs } from 'vue';
import type { Field } from '../useField';

const { field } = defineProps<{
	field: Field;
}>();

const { valid, invalid, disabled, enabled, dirty } = toRefs(field);
</script>

<style lang="scss" scoped></style>
