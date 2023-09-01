---
outline: deep
---

# Validators

Validators are simple functions that take in the current field's value as first parameter and return a `boolean` indicating if the field is valid or not.

## Built-in validators

`@vuetils/form` comes with a set of built-in validators that can be used out of the box but it is also easy to [write your own](#write-your-own-validator).

- `startsWith` - value is a string and starts with the given string
- `regex` - value matches a regex
- `email` - value is an email
- `emoji` - value is an emoji

These validators can be added to any `form` or `field` like so:

```ts
import { email, emoji, regex, startsWith, useField, useForm } from '@vuetils/form';

const form = useForm({
	field: ['', [email, emoji, regex(/regexIHardlyKnowHer/), startsWith('zwallo')]],
});

const field = useField('field', {
	validators: [email, emoji, regex(/regexIHardlyKnowHer/), startsWith('zwallo')],
});
```

### HTML validation attributes

HTML comes with a set of [validation attributes](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#using_built-in_form_validation) that let you validate your forms without JavaScript. Usually it is recommended to use these attrbutes even if you are validation you form with JavaScript. `@vuetils/form` has built-in equivalents for the following native validation attributes:

- `required` - form field needs to be filled out
- `minlength` and `maxlength` - min and max length of a string form field
- `min` and `max` - min and max value of a numeric form field
<!-- - `pattern` -->

When used in combination with [`UField`](./components#ufield) or [`UForm`](./components#uform) these attributes will automatically be added to your input elements so you can have the best of both worlds.

## Async validators

Async validators are like normal validators but their validation function returns a `Promise<boolean>` instead of a `boolean` . See how you can add both a sync and an async validator to a `field` or `form` in the example below.

<<< ./asyncValidatorExample.ts

## Write your own validator

`@vuetils/form` comes with the helper function `defineValidator` that makes it easy to write your own validator. The first argument is the name of your validator and the second argument is the validation function. The validation function takes in the current field's value as first parameter and returns a `boolean` indicating if the field is valid or not. The validation function is executed on every value change of a field.

<<< ./defineValidatorExample.ts

If your validator needs some extra arguments you can use `defineValidatorWithArgs` instead. The only difference to `defineValidator` is that the validation function will receive your custom arguments as the 2. parameter. When adding a type to the arguments, like `shouldBe: string` in the example below, your validator wil be type safe.

<<< ./defineValidatorWithArgsExample.ts
