# Tiny form validation library for Vue

<a href="https://pkg-size.dev/@vuetils/form?no-peers"><img src="https://pkg-size.dev/badge/bundle/4649" title="Bundle size for @vuetils/form"></a>

## Documentation

Check out the [interactive documentation and demos](https://form.vuetils.dev/)

## Features

- ⚡️ Tiny - <5KB minified (2KB gzip)
- 🔑 Typesafe - End-to-end typesafety with autocomplete
- 🔌 Extensible - First party plugins and easy plugin API

## Usage

```vue
<script setup>
import { UField, UForm, email, minLength, required, useForm } from '@vuetils/form';

const form = useForm({
  email: ['', [required, email]],
  password: ['', [required, minLength(6)]],
});
</script>

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

Refer to the [documentation](https://form.vuetils.dev/) for more details.

## License

[MIT License](https://github.com/YannicEl/vue-useForm/blob/main/packages/lib/LICENSE) © 2023-present [Yannic Ellhotka](https://github.com/YannicEl)
