<template>
	<Render />
	{{ field?.value }}
</template>

<script setup lang="ts">
import { computed, h, useSlots, watch } from 'vue';
import { injectForm } from '../composables/useFormInject';
import type { Field } from '../useField';

const props = defineProps<{
	field?: Field;
}>();

const form = injectForm();

const slots = useSlots();
const defaultSlots = computed(() => {
	console.log('slots computed');
	const defaultSlots = slots.default?.();
	return Array.isArray(defaultSlots) ? defaultSlots : [];
});

const inputNode = computed(() => {
	console.log('inputNode computed');
	return defaultSlots.value.find((slot) => slot.type === 'input');
});

const labelNodes = computed(() => {
	console.log('labelNodes computed');
	return defaultSlots.value.filter((slot) => slot.type !== 'input');
});

const field = computed(() => {
	if (props.field) return props.field;

	const { name } = inputNode.value?.props || {};

	if (!name) {
		console.warn('Input has not name prop');
		return;
	}

	const field = form?.fields[name];

	if (!field) {
		console.warn(`Form has no field "${name}"`);
		return;
	}

	return field;
});

watch(field, (change) => {
	console.log('watch');
	console.log(change);
});

const Render = () => {
	console.log('rerender');

	console.log(field.value?.value);

	const children = labelNodes.value;
	if (inputNode.value) {
		console.log('hi');

		const input = h(inputNode.value, {
			type: field.value?.value,
			value: field.value?.value + '123',
			onInput(event: InputEvent) {
				if (!field.value) return;
				field.value.value = (event.target as HTMLInputElement).value;
			},
		});

		console.log(input);

		children.push(input);
	}

	return h('label', {}, children);
};
</script>

<style lang="scss" scoped></style>
