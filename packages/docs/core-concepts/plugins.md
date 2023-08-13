---
outline: deep
---

# Plugins

## What is a plugin?

`@vuetils/form` supports plugins to extend the functionality of a form. Plugins have acces to the entire [`Form`](../api#form) instance and can therefore be used for example to:

- watch for value changes
- persist form state in local storage or a database
- manipulate the form state
- enable/disable form fields
- and much more

## How to use a plugin?

Plugins can be added to a form in one of two ways. The easiest option is to pass the plugin to the [`useForm()`](../api#useform) function.

```ts
import { localStoragePlugin, useForm } from '@vuetils/form';

const form = useForm(
	{
		email: [''],
		password: [''],
	},
	{
		plugins: [localStoragePlugin('some-key')],
	}
);
```

The second option is to dynamically add a plugin with the [`addPlugin()`](../api#addplugin) function.

```ts
import { localStoragePlugin, useForm } from '@vuetils/form';

const form = useForm({
	email: [''],
	password: [''],
});

form.addPlugin(localStoragePlugin('some-key'));
```

## Built-in Plugins

`@vuetils/form` comes with a set of built-in plugins that can be used out of the box.

### Storage Plugin

The storage plugin persists the form's values on every value change. It also tries to restore the form state on initialization. For example, if a user has partially filled out a form and leaves and returns or refreshes the page, the form state is restored.

Internaly the plugin uses the [`Storage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage) interface from the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) to set and get items to and form storage.

The plugin takes in an options object with 2 properties, a string key and a [`Storage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage) object. The two storage types used in the browser are [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) and [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) but the plugin will work with any object implementing the [`Storage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage) interface.

```ts
import { storagePlugin } from '@vuetils/form';

storagePlugin({ key: 'some-key', storage: localStorage });
```

For local and session storage `@vuetils/form` provides two helper plugin in [`localStoragePlugin`](#local-storage-plugin) and [`sessionStoragePlugin`](#session-storage-plugin).

### Local Storage Plugin

The local storage plugin is a wrapper around the [`storagePlugin`](#storage-plugin) with [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) as the storage option.

```ts
import { localStoragePlugin } from '@vuetils/form';

localStoragePlugin('some-key');
```

### Session Storage Plugin

The session storage plugin is a wrapper around the [`storagePlugin`](#storage-plugin) with [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) as the storage option.

```ts
import { sessionStoragePlugin } from '@vuetils/form';

sessionStoragePlugin('some-key');
```

### Zod Plugin

// TODO

### Valibot Plugin

// TODO

## Write your own Plugin

The best part about plugins is that you can easily write your own. `@vuetils/form` comes with the helper function [`definePlugin`](../api#defineplugin) that makes writing typesafe plugins a breeze.

[`definePlugin`](../api#defineplugin) takes a callback function as its argument. This callback is passed the current [`Form`](../api#form) instance and the plugin options as its arguments. If you pass a Type or Interface to [`definePlugin`](../api#defineplugin) the options object will be correctly typed.

Your created plugin can be used like any other plugin, as described [here](#plugins).

```ts
import { definePlugin } from '@vuetils/form';

interface PluginOptions {
	// plugin options
}

const myPlugin = definePlugin<PluginOptions>((form, options) => {
	// do something with the form
});
```
