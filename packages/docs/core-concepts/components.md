# Components

`@vuetils/form` comes with two helper components [`UField`](#ufield) and [`UForm`](#uform) that make it easier to create forms.

## UField

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

## Validation Classes
