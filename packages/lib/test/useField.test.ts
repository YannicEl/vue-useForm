import { assert, describe, it } from 'vitest';
import { useField } from '../dist';
import { dummyAsyncValidatorValid, dummyValidatorValid } from './utils';

describe('useField', () => {
	describe('Correct initialization', () => {
		it('Default options', () => {
			const field = useField('test');

			assert.equal(field.value, 'test');
			assert.equal(field.validators.size, 0);
			assert.equal(field.asyncValidators.size, 0);
			assert.equal(field.errors.length, 0);
			assert.equal(field.async, false);
			assert.equal(field.pending, false);

			assert.equal(field.invalid, false);
			assert.equal(field.valid, true);

			assert.equal(field.disabled, false);
			assert.equal(field.enabled, true);

			assert.equal(field.dirty, false);
			assert.equal(field.pristine, true);

			assert.equal(field.touched, false);
			assert.equal(field.untouched, true);
		});

		it('Async', async () => {
			const field = useField('test', {
				asyncValidators: [dummyAsyncValidatorValid],
			});

			assert.equal(field.value, 'test');
			assert.equal(field.validators.size, 0);
			assert.equal(field.asyncValidators.size, 1);
			assert.equal(field.errors.length, 0);
			assert.equal(field.async, true);
			assert.equal(field.pending, true);

			assert.equal(field.invalid, false);
			assert.equal(field.valid, true);

			assert.equal(field.disabled, false);
			assert.equal(field.enabled, true);

			assert.equal(field.dirty, false);
			assert.equal(field.pristine, true);

			assert.equal(field.touched, false);
			assert.equal(field.untouched, true);
		});

		it('Sync', async () => {
			const field = useField('test', {
				validators: [dummyValidatorValid],
			});

			assert.equal(field.value, 'test');
			assert.equal(field.validators.size, 1);
			assert.equal(field.asyncValidators.size, 0);
			assert.equal(field.errors.length, 0);
			assert.equal(field.async, false);
			assert.equal(field.pending, false);

			assert.equal(field.invalid, false);
			assert.equal(field.valid, true);

			assert.equal(field.disabled, false);
			assert.equal(field.enabled, true);

			assert.equal(field.dirty, false);
			assert.equal(field.pristine, true);

			assert.equal(field.touched, false);
			assert.equal(field.untouched, true);
		});
	});
});
