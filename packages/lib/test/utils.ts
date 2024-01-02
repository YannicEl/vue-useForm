import { defineValidator } from '../dist';

export async function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const dummyValidatorValid = defineValidator('dummyValid', () => true);
export const dummyValidatorInvalid = defineValidator('dummyInvalid', () => false);

export const dummyAsyncValidatorValid = defineValidator('dummyAsyncValid', async () => true);
export const dummyAsyncValidatorInvalid = defineValidator('dummyAsyncInvalid', async () => true);
