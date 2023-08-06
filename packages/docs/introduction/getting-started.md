# Introduction

## Installation

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

## How it works

You start of by creating a form object with [`useForm()`](../api#useForm). The function takes in an object where every property represents an input element in your form. The key of the property coorolates to the name attribute of an input element and the value is and array where the first element is the initial value of the input and the second element is an array of [validators](../core-concepts/validators) . `@vuetils/form` comes with a set of [validators](../core-concepts/validators) that you can use to validate your form.

```js
import { email, minLength, required, useForm } from '@vuetils/form';

const form = useForm({
	email: ['', [required, email]],
	password: ['', [required, minLength(6)]],
});
```

## Usage

<<< ./GettingStarted.vue

<script setup>
import GettingStarted from './GettingStarted.vue'
</script>

<GettingStarted />

## What's Next?

- TODO
