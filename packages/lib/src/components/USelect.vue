<template>
	<select v-model="field!.value" :class="classes">
		<slot />
	</select>
</template>

<script setup lang="ts">
import { getFieldAndClasses, type CustomInputProps } from './utils';

const props = defineProps<CustomInputProps>();
const { field, classes } = getFieldAndClasses(props);
</script>
