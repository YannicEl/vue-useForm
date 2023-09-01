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

- **Form wide validators**

  Make it possible to add validators to the entire form. Maybe with this syntax:

  ```ts
  import { useForm } from '@vuetils/form';

  const form = useForm(
  	{
  		hallo: [''],
  		zwallo: [0],
  		drallo: [false],
  	},
  	{
  		validators: [],
  		asyncValidators: [],
  	}
  );
  ```

- **Zod and Valibot form wide validators**

  When form wide validators are implemented a zod validator could look something like this:

  ```ts
  import { Schema, z } from 'zod';

  const zodValidator = defineValidatorWithArgs('zod', (value, schema: Schema) => {
  	try {
  		schema.parse(value);
  		return true;
  	} catch {
  		return false;
  	}
  });

  const schema = z
  	.object({
  		hallo: z.string(),
  		zwallo: z.number(),
  		drallo: z.boolean(),
  	})
  	.strict();

  const form = useForm(
  	{
  		hallo: [''],
  		zwallo: [''],
  		drallo: [''],
  	},
  	{
  		validators: [zodValidator(schema)],
  	}
  );
  ```
