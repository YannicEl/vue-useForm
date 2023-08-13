---
outline: deep
---

# Forms and Fields

[`useForm`](#useform) is pretty much at the core of `@vuetils/form`. Every time you want to group two or more input elements together [`useForm`](#useform) is probably the way to go. If on the other hand you are dealing with just a single input you can use [`useField`](#usefield).

## UseForm

[`useForm`](../api#useform) groups together multible form fields and exposes a couple of properties and functions to interact with the form and its fields. Internaly [`useForm`](../api#useform) uses [`useField`](#usefield) to create a [`Field`](../api#field) instance for every form field.

### Usage

Define a form with [`useForm`](../api#useform) passing an object describing your form layout. Every property of the object represents an input element in your form. The key of the property corresponds to the name attribute of an input element and the value is an array where the first element is the initial value of the input, the second element is an array of [validators](./validators) and the third element is an array of [async valdiators](./validators#async-validators).

```ts
import { defineValidator, useForm } from '@vuetils/form';

const syncValidator = defineValidator('sync', (value) => true);
const asyncValidator = defineValidator('async', async (value) => true);

const form = useForm({
	hallo: ['initialValue', [syncValidator], [asyncValidator]],
	zwallo: [0],
	drallo: [false, [], [asyncValidator]],
});
```

### State

The [`Form`](../api#form) instance exposes a couple of `boolean` properties that describe the state of the form.

- `valid` - `true` if all associated fields are valid
- `invalid` - opposite of valid
- `enabled` - `true` if all associated fields are enabled
- `disabled` - opposite of enabled
- `pristine` - `true` if all of the associated fields are pristine
- `dirty` - opposite of pristine
- `pending` - `true` if at least one of the associated fields is pending
- `submitted` - `true` if the form has been submitted

These properties can be acces directly on the [`Form`](../api#form) instance like so:

```ts
import { useForm } from '@vuetils/form';

const form = useForm({
	hallo: [''],
});

console.log(form.pristine); // true
console.log(form.dirty); // false
console.log(form.pending); // false
```

### Values

`form.values` is an object containing the values of all ascociated [`Field`](../api#field) instances of a form.

```ts
import { useForm } from '@vuetils/form';

const form = useForm({
	hallo: ['hallo'],
	zwallo: [12],
	drallo: [true],
});

console.log(form.values);
// {
//   hallo: 'hallo',
//   zwallo: 12,
//   drallo: true,
// }
```

### Fields

`form.fields` is an object containing all ascociated [`Field`](../api#field) instances of a form.

```ts
import { useForm } from '@vuetils/form';

const form = useForm({
	hallo: [''],
	zwallo: [0],
	drallo: [false],
});

console.log(form.fields);
// {
//   hallo: Field<string>,
//   zwallo: Field<number>,
//   drallo: Field<boolean>,
// }
```

### setValues()

`form.setValues()` is a type safe way to set multible values of your form at once. You have autocomplete and get errors when you want to for example set a string input to a number.

```ts
import { useForm } from '@vuetils/form';

const form = useForm({
	hallo: [''],
	zwallo: [''],
	drallo: [''],
});

form.setValues({
	hallo: 'hallo',
	zwallo: 'zwallo',
	drallo: true, // Error: Type 'boolean' is not assignable to type 'string'.
});
```

### reset()

`form.reset()` resets the form state and the state of every associated field to its initial value.

```ts
import { useForm } from '@vuetils/form';

const form = useForm({ hallo: [''] });

form.reset();
```

### disable() / enable()

`form.disable()` and `form.enable()` disables and enables all associated form fields. When used in combination with [`UForm`](./components#uform) or [`UField`](./components#ufield) the `disabled` attribute on the `input` element will also be set.

```ts
import { useForm } from '@vuetils/form';

const form = useForm({ hallo: [''] });

form.disable();
form.enable();
```

### awaitValidation()

`form.awaitValidation()` lets you await all pending [async validators](./validators#async-validators) from associated form fields. The usual use case for this would be to await all the pending validation before handeling the submit event.

```ts
import { useForm } from '@vuetils/form';

const form = useForm({ hallo: [''] });

async function onSubmit() {
	await form.awaitValidation();
	if (form.isValid) throw new Error('Form is not valid');
	// do submit stuff
}
```

### addPlugin()

With `form.addPlugin()` you can add [plugins](./plugins) to a form after it has been initialized.

```ts
import { localStoragePlugin, useForm } from '@vuetils/form';

const form = useForm({ hallo: [''] });

form.addPlugin(localStoragePlugin);
```

## UseField

With [`useField`](../api#usefield) you can define a single form field and similary to [`useForm`](#useform) it exposes a couple of properties and functions to interact with the field.

### Usage

Define a field with [`useField`](../api#usefield), pass an initial value and add sync or async [validators](./validators).

```ts
import { defineValidator, useField } from '@vuetils/form';

const syncValidator = defineValidator('sync', (value) => true);
const asyncValidator = defineValidator('async', async (value) => true);

const field = useField('initialValue', {
	validators: [syncValidator],
	asyncValidators: [asyncValidator],
});
```

### State

The [`Field`](../api#field) instance exposes a couple of `boolean` properties that describe the state of the field.

- `valid` - `true` if the field is valid
- `invalid` - opposite of valid
- `enabled` - `true` if the field is enabled
- `disabled` - opposite of enabled
- `pristine` - `true` if the field is pristine
- `dirty` - opposite of pristine
- `async` - `true` if field has at least one [async validator](./validators#async-validators)
- `pending` - `true` if at least on [async validator](./validators#async-validators) is pending

  These properties can be acces directly on the [`Field`](../api#field) instance like so:

```ts
import { useField } from '@vuetils/form';

const form = useField('');

console.log(form.pristine); // true
console.log(form.dirty); // false
console.log(form.pending); // false
```

### reset()

`field.reset()` resets the field state to its initial value.

```ts
import { useField } from '@vuetils/form';

const field = useField('');

field.reset();
```

### disable() / enable()

`field.disable()` and `field.enable()` disables and enables the field. When used in combination with [`UField`](./components#ufield) the `disabled` attribute on the `input` element will also be set.

```ts
import { useField } from '@vuetils/form';

const field = useField('');

field.disable();
field.enable();
```

### awaitValidation()

`field.awaitValidation()` lets you await all pending [async validators](./validators#async-validators).

```ts
import { useField } from '@vuetils/form';

const field = useField('');

await field.awaitValidation();
```
