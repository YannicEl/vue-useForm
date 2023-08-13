# Tiny form validation library for Vue

[![pkg-size](https://pkg-size.dev/badge/bundle/5368)](https://pkg-size.dev/@vuetils/form?no-peers)
[![npm](https://img.shields.io/npm/v/@vuetils/form)](https://www.npmjs.com/package/@vuetils/form)


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

## Changelog

The up to date changelog can be found [here](https://github.com/YannicEl/vue-useForm/blob/main/packages/lib/CHANGELOG.md).

## Contribution

Please read the [Contributing Guide](https://github.com/YannicEl/vue-useForm/blob/main/.github/contributing.md) before making a pull request.

## License

[MIT License](https://github.com/YannicEl/vue-useForm/blob/main/packages/lib/LICENSE) © 2023-present [Yannic Ellhotka](https://github.com/YannicEl)
