# Markdown Extension Examples

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Output**

```vue
<template>
	<VForm :form="form">
		<VLabel class="flex flex-col">
			Label
			<input type="text" name="field" />
		</VLabel>
	</VForm>
</template>

<script setup lang="ts">
import { VForm, VLabel, useForm } from '@vuetils/form';

const form = useForm({
	field: [''],
});
</script>
```

<script setup>
import Test from './Test.vue'
</script>

<Test />

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
