<script setup lang="ts">
console.log('setup');

const { text } = defineProps<{
	text: string;
}>();
</script>

<template>
	<button>{{ text }}!!</button>
</template>

<style scoped>
button {
	background: red;
}
</style>
