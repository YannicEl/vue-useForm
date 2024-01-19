<template>
	<select v-model="field!.value" :class="classes" v-bind="{ ...$attrs, ...validationAttrs }">
		<slot />
	</select>
</template>

<script setup lang="ts">
import { getFieldAndClasses, type CustomInputProps } from './utils';

const props = defineProps<CustomInputProps>();
const { field, classes, validationAttrs } = getFieldAndClasses(props);
</script>
