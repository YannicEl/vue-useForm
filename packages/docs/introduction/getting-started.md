<script setup>
import GettingStarted from './GettingStarted.vue'
import Test from './Test.vue';
</script>

# Getting Started

## Installation

<Test />

::: code-group

```sh [npm]
$ npm install @vuetils/form
```

```sh [pnpm]
$ pnpm add @vuetils/form@latest
```

```sh [yarn]
$ yarn add @vuetils/form
```

:::

## Usage

You start of by creating a [`Form`](../api#form) instance with [`useForm()`](../api#useForm). The function takes in an object where every property represents an input element in your form. The key of the property corresponds to the name attribute of an input element and the value is an array where the first element is the initial value of the input and the second element is an array of [validators](../core-concepts/validators).

```vue
<script setup>
import { UField, UForm, email, minLength, required, useForm } from '@vuetils/form';

const form = useForm({
	email: ['', [required, email]],
	password: ['', [required, minLength(6)]],
});
</script>
```

`@vuetils/form` provides two helper componets that automatically link a [`Form`](../api#form) instance with your input elements. The components handle two-way data binding and add [validation classes](../core-concepts/components#validation-classes) like `v-valid` or `v-submitted`.

```vue
<template>
	<UForm :form="form">
		<UField>
			Email:
			<input type="email" name="email" />
		</UField>

		<UField>
			Password:
			<input type="password" name="password" />
		</UField>

		<button>Submit</button>
	</UForm>
</template>
```

The rendered form will look something like this. Play around with it and see how the errors and state change while you are typing.

<GettingStarted class="mt-12"/>

## What's Next?

- To discover more about what the `Form` and `Field` instances can do, check out the [`useForm` and `useField`](../core-concepts/) guide.

- To better understand what is going on under the hood of `UForm` and `UField`, read about it in [the components guide](../core-concepts/components).

- Find out about all the [built in validators](../core-concepts/validators) or learn how you can easily [write your own validator](../core-concepts/validators#write-your-own-validator).

- Checkout [what plugins are](../core-concepts/plugins), explore a list of [first party plugins](../core-concepts/plugins#first-party-plugins) or learn how you can [write your own plugin](../core-concepts/plugins#write-your-own-plugin).
