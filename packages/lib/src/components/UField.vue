<template>
	<label class="v-label">
		<LabelContent />
		<Render />
	</label>
</template>

<script setup lang="ts">
import { computed, h, ref, useSlots } from 'vue';
import { injectForm } from '../composables/useFormInject';
import type { Field } from '../useField';
import { getClassnames } from '../utils';

const props = defineProps<{
	field?: Field;
	fieldName?: string;
}>();

const slots = useSlots();
const defaultSlots = computed(() => slots.default?.() ?? []);

const touched = ref(false);

const labelNodes = computed(() => {
	return defaultSlots.value.filter((slot) => slot.type !== 'input' && slot.type !== 'select');
});

const LabelContent = () => {
	return labelNodes.value;
};

const inputNode = computed(() => {
	return defaultSlots.value.find((slot) => slot.type === 'input' || slot.type === 'select');
});

const field = computed(() => {
	if (props.field) return props.field;

	const attributes = inputNode.value?.props ?? {};
	const { name } = attributes;

	if (!name && !props.fieldName) {
		console.warn('Input has not name prop');
		return;
	}

	const form = injectForm();
	if (!form) {
		console.warn('Input is not inside a VForm component');
		return;
	}

	const field = form.fields[props.fieldName ?? name];

	if (!field) {
		console.warn(`Form has no field "${name}"`);
		return;
	}

	field.disabled = 'disabled' in attributes;

	return field;
});

const Render = () => {
	if (!inputNode.value) return;
	if (!field.value) return;

	const classes = getClassnames(field.value);
	classes.push({ 'v-touched': touched.value });
	classes.push({ 'v-untouched': !touched.value });

	return h(inputNode.value, {
		value: field.value.value,
		onInput(event: InputEvent) {
			if (!field.value) return;
			field.value.value = (event.target as HTMLInputElement).value;
		},
		onBlur() {
			touched.value = true;
		},
		disabled: field.value.disabled,
		class: classes,
	});
};
</script>

<style lang="scss" scoped></style>
