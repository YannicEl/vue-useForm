import { useField, useForm } from '@vuetils/form';
import { assert, it } from 'vitest';

it('should pass', () => {
	const field = useField('test');

	assert.equal(field.value, 'test');

	field.value = 'test2';

	assert.equal(field.value, 'test2');
});

it('nested form', () => {
	const form = useForm({
		layer1: ['layer1'],
		hallo: {
			layer2: ['layer2'],
			zwallo: {
				layer3: ['layer3'],
			},
		},
	});

	assert.equal(form.values.layer1, 'layer1');
	assert.equal(form.values.hallo.layer2, 'layer2');
	assert.equal(form.values.hallo.zwallo.layer3, 'layer3');

	form.fields.hallo.fields.zwallo.fields.layer3.value = 'dirty';

	assert.equal(form.pristine, false);
	assert.equal(form.fields.hallo.pristine, false);
	assert.equal(form.fields.hallo.fields.zwallo.pristine, false);

	form.reset();

	form.fields.hallo.fields.layer2.value = 'dirty';

	assert.equal(form.pristine, false);
	assert.equal(form.fields.hallo.pristine, false);
	assert.equal(form.fields.hallo.fields.zwallo.pristine, true);

	form.reset();

	form.fields.layer1.value = 'dirty';

	assert.equal(form.pristine, false);
	assert.equal(form.fields.hallo.pristine, true);
	assert.equal(form.fields.hallo.fields.zwallo.pristine, true);
});
