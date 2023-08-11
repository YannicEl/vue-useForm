---
outline: deep
---

# Components

`@vuetils/form` comes with two helper components [`UField`](#ufield) and [`UForm`](#uform) that make it easier to create forms. These components handle the two-way data binding and add validation classes to the inputs and the `form` element so differnt form states can be styled with CSS.

## UField

`UField` is the basic building block of a form. It is a wrapper around the native `label` element and can be used in the exact same way. `UField` needs exactly one `input` element as a slot and can have optional label content too. The label content can either be just plain text like in the [example](#ufield-example) below or any other Vue components or HTML elements.

If used outside a `UForm` component `UField` needs a [`Field`](../api#field) instance as a prop.

### Validation Classes

Depending on the validation state of the [`Field`](../api#field) instance these classes are added to the `input` element:

- `v-valid` - added when the field is valid
- `v-invalid` - added when the field is invalid
- `v-pristine` - added when the field's value has not been changed yet
- `v-dirty` - added when the field's value has been changed
- `v-pending` - added when the field has [`async validators`](./validators#async-validators) that are being resolved

There are also the classes `v-label` and `v-input` that are added to the `label` and `input` elements respectively. Play around with the example and see how different classes get added or removed.

### Example {#ufield-example}

<<< ./UFieldExample.vue

<script setup>
import UFieldExample from './UFieldExample.vue'
import UFormExample from './UFormExample.vue'
import { UField, useField, getClassnames, required, useForm } from '@vuetils/form';
import {computed} from "vue"

const field = useField('', { validators: [required] });
const form = useForm({
	firstname: ['', [required]],
	lastname: ['', [required]],
});

function getClasses(fieldOrForm) {
  	return getClassnames(fieldOrForm)
		.filter((c) => Object.values(c)[0])
		.map((c) => Object.keys(c)[0])
		.join(' ') 
}

const fieldClasses = computed(() => getClasses(field))
const formClasses = computed(() => {
  return {
    form: getClasses(form),
    firstname: getClasses(form.fields.firstname),
    lastname: getClasses(form.fields.lastname),
  }
})

</script>

<div class="flex gap-4 items-end">
  <UFieldExample class="w-full" :field="field" />
  <button class="button min-w-max h-min" @click="field.reset()">
    Reset Field
  </button>
</div>

### Markup {#ufield-markup}

This will create the following clean and minimal HTML markup

```html-vue
// model value: {{ field.value }}
<label class="v-label">
	Label:
	<input
    name="field"
    type="text"
    required
    class="{{ fieldClasses }}"
  />
</label>
```

## UForm

`UForm` is a wrapper around the native `form` element and can be used in the exact same way. `UForm` needs `UField` components as child slots. The name attribute of the `input` element is used to bind the input to the matching [`Field`](../api#field) instance.

### Validation Classes

Similar how it works with [`UField`](#ufield) these classes are added depending on the validation state of the [`Form`](../api#form) instance:

- `v-valid` - added when **all** fields are valid
- `v-invalid` - added when **on ore more** fields are invalid
- `v-pristine` - added when **all** fields are pristine
- `v-dirty` - added when **one or more** fields are dirty
- `v-pending` - added when **one or more** fields are pending
- `v-submitted` - added when the form has been submitted no matter if it was valid or not

There is also the class `v-form` that is added to the `form` element. Play around with the example and see how differnt classes get added or removed.

### Example {#uform-example}

<<< ./UFormExample.vue

<style>
  .v-form-override button {
	  grid-column: span 2 / span 2;
  }
</style>

<UFormExample :form="form" class="v-form-override grid! grid-cols-2"/>

<button class="button w-full mt-4" @click="form.reset()">
Reset Form
</button>

### Markup {#uform-markup}

This will create the following clean and minimal HTML markup

```html-vue
<form class="{{ formClasses.form }}">
  // model value: {{ form.values.firstname }}
  <label class="v-label">
    Email:
    <input
      name="firstname"
      type="firstname"
      required
      class="{{ formClasses.firstname }}"
    />
  </label>

  // model value: {{ form.values.lastname }}
  <label class="v-label">
    Password:
    <input
      name="lastname"
      type="lastname"
      required
      class="{{ formClasses.lastname }}"
    />
  </label>

  <button>Submit</button>
</form>
```

### Submit event

`UForm` emits the custom event `v-submit` every time the form is submitted. The event handler receives the current values of the form. This can also be typed with `typeof form.values` as shown in the example below.

If you want to you can also just listen to the native [`submit`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event) event.

```vue
<template>
	<UForm :form="form" v-submit="onSubmit">
		<!-- Form inputs -->
	</UForm>
</template>

<script setup lang="ts">
import { UForm, useForm } from '@vuetils/form';

const form = useForm({
	firstname: [''],
	lastname: [''],
});

function onSubmit(values: typeof form.values) {
	if (form.invalid) {
		//handle errors
	}

	// do something with the values
}
</script>
```
