<template>
	<textarea v-model="field!.value" :class="classes">
		<slot />
	</textarea
	>
</template>

<script setup lang="ts">
import { getFieldAndClasses, type CustomInputProps } from './utils';

const props = defineProps<CustomInputProps>();
const { field, classes } = getFieldAndClasses(props);
</script>
