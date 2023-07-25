import { assert, it } from 'vitest';
import { useField } from '../dist/index.js';

it('should pass', async () => {
	const field = useField('test');

	assert.equal(field.value, 'test');

	field.value = 'test2';

	assert.equal(field.value, 'test2');
});
