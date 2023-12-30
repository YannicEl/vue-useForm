# Feature ideas

Stuff I'm thinking about but haven't implemented yet.

- **Form field grouping**

  Make it possible to group fields together when using `useForm`. Mayby with this syntax:

  ```ts
  import { useForm } from '@vuetils/form';

  const form = useForm({
  	name: [''],
  	address: {
  		street: [''],
  		city: [''],
  	},
  });
  ```
