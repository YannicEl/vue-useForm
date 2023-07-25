import { useField } from '@vuetils/vue-useform';
import { assert, it } from 'vitest';

it('should pass', async () => {
	const field = useField('test');

	assert.equal(field.value, 'test');

	field.value = 'test2';

	assert.equal(field.value, 'test2');
});
