<template>
	<label class="v-label">
		<LabelContent />
		<InputElement />
	</label>
</template>

<script setup lang="ts">
import { computed, h, useSlots } from 'vue';
import { injectForm } from '../composables/useFormInject';
import type { Field } from '../useField';
import { getClassnames } from '../utils';

const props = defineProps<{
	field?: Field;
	fieldName?: string;
}>();

const slots = useSlots();
const defaultSlots = computed(() => slots.default?.() ?? []);

const labelNodes = computed(() => {
	return defaultSlots.value.filter(
		(slot) => slot.type !== 'input' && slot.type !== 'select' && slot.type !== 'textarea'
	);
});

const LabelContent = () => {
	return labelNodes.value;
};

const inputNode = computed(() => {
	return defaultSlots.value.find(
		(slot) => slot.type === 'input' || slot.type === 'select' || slot.type === 'textarea'
	);
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

	if ('values' in field) {
		console.warn('Field is actually a field group');
		return;
	}

	field.disabled = 'disabled' in attributes;

	return field;
});

const InputElement = () => {
	if (!inputNode.value) return;
	if (!field.value) return;

	const props: any = {
		onInput(event: InputEvent) {
			if (!field.value) return;
			let value: any = (event.target as HTMLInputElement).value;

			if (Array.isArray(field.value.value)) {
				const set = new Set(field.value.value);
				if (set.has(value)) {
					set.delete(value);
				} else {
					set.add(value);
				}
				value = [...set];
			}
			field.value.value = value;
		},
		onBlur() {
			if (!field.value) return;
			field.value.touched = true;
		},
		disabled: field.value.disabled,
		class: getClassnames(field.value),
	};

	const inputType = inputNode.value.props?.type;

	if (inputType === 'text' || inputType === 'textarea') {
		props.value = field.value.value;
	}

	if (inputType === 'radio' || inputType === 'checkbox') {
		props.checked =
			field.value.value === inputNode.value.props?.value ||
			field.value.value?.includes(inputNode.value.props?.value);
	}

	return h(inputNode.value, props);
};
</script>

<style lang="scss" scoped></style>
