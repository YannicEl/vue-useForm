<template>
	<slot
		:class="{
			valid,
			invalid,
			disabled,
			enabled,
			dirty,
		}"
		:value="field.value"
		@input="onInput"
		:disabled="disabled"
		:required="required"
		:min="min"
		:max="max"
		:minLength="minLength"
		:maxLength="maxLength"
	></slot>
</template>

<script lang="ts" setup>
import { Field, Validator } from '@yannicel/vue-useform';

const { field } = defineProps<{
	field: Field;
}>();

// const slots = useSlots();

// onMounted(() => {
// 	console.log(slots);
// });
const { valid, invalid, disabled, enabled, dirty, validators } = toRefs(field);

function getValidator(validators: Ref<Set<Validator>>, name: string): Validator | null {
	let ret: null | Validator = null;
	validators.value.forEach((validator) => {
		if (!ret && validator.name === name) {
			ret = validator;
		}
	});

	return ret;
}

const required = computed(() => {
	return !!getValidator(validators, 'required');
});

const min = computed(() => {
	const validator = getValidator(validators, 'min');
	if (!validator) return null;
	return validator.value;
});

const max = computed(() => {
	const validator = getValidator(validators, 'max');
	if (!validator) return null;
	return validator.value;
});

const minLength = computed(() => {
	const validator = getValidator(validators, 'minLength');
	if (!validator) return null;
	return validator.value;
});

const maxLength = computed(() => {
	const validator = getValidator(validators, 'maxLength');
	if (!validator) return null;
	return validator.value;
});

function onInput(e: Event) {
	field.value = (e.target as HTMLInputElement).value;
}
</script>

<style lang="scss" scoped></style>
