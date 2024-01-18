<template>
	<select v-model="field.value" :class="classes">
		<slot />
	</select>
</template>

<script setup lang="ts">
import { Field } from '../useField';
import { getFieldAndClasses } from './utils';

const props = defineProps<{
	field?: Field;
	fieldName?: string;
}>();

const { field, classes } = getFieldAndClasses(props);
</script>
