<template>
	<div class="grid grid-cols-2 gap-4">
		<!-- text -->
		<label class="v-label">
			{{ text.value }}
			<UInput type="text" :field="text" />
		</label>

		<label class="v-label">
			{{ textM }}
			<input class="v-input" type="text" v-model="textM" />
		</label>

		<!-- textarea -->
		<label class="v-label">
			{{ textarea.value }}
			<UTextarea :field="textarea"></UTextarea>
		</label>

		<label class="v-label">
			{{ textareaM }}
			<textarea class="v-input" v-model="textareaM"></textarea>
		</label>

		<!-- checkbox -->
		<label class="v-label">
			{{ checkbox.value }}
			<UInput type="checkbox" :field="checkbox" />
		</label>

		<label class="v-label">
			{{ checkboxM }}
			<input class="v-input" type="checkbox" v-model="checkboxM" />
		</label>

		<!-- checkboxes -->
		<div>
			{{ checkboxes.value }}
			<div class="flex">
				<label class="v-label">
					<UInput type="checkbox" name="checkboxes" value="Jack" :field="checkboxes" />
				</label>

				<label class="v-label">
					<UInput type="checkbox" name="checkboxes" value="John" :field="checkboxes" />
				</label>

				<label class="v-label">
					<UInput type="checkbox" name="checkboxes" value="Mike" :field="checkboxes" />
				</label>
			</div>
		</div>

		<div>
			{{ checkboxesM }}
			<div class="flex">
				<label class="v-label">
					<input class="v-input" type="checkbox" value="Jack" v-model="checkboxesM" />
				</label>
				<label class="v-label">
					<input class="v-input" type="checkbox" value="John" v-model="checkboxesM" />
				</label>
				<label class="v-label">
					<input class="v-input" type="checkbox" value="Mike" v-model="checkboxesM" />
				</label>
			</div>
		</div>

		<!-- radio -->
		<div>
			{{ radio.value }}
			<div class="flex">
				<label class="v-label">
					<UInput type="radio" value="first" name="radio" :field="radio" />
				</label>

				<label class="v-label">
					<UInput type="radio" value="second" name="radio" :field="radio" />
				</label>
			</div>
		</div>

		<div>
			{{ radioM }}
			<div class="flex">
				<label class="v-label">
					<input class="v-input" type="radio" value="first" v-model="radioM" />
				</label>
				<label class="v-label">
					<input class="v-input" type="radio" value="second" v-model="radioM" />
				</label>
			</div>
		</div>

		<!-- select -->
		<label class="v-label">
			{{ select.value }}
			<USelect :field="select">
				<option>A</option>
				<option>B</option>
				<option>C</option>
			</USelect>
		</label>

		<label class="v-label">
			{{ selectM }}
			<select class="v-input" v-model="selectM">
				<option>A</option>
				<option>B</option>
				<option>C</option>
			</select>
		</label>
	</div>
</template>

<script setup lang="ts">
import { UInput, useField, USelect, UTextarea } from '@vuetils/form';
import { ref } from 'vue';

const text = useField('text');
const textM = ref('text');

const textarea = useField('textarea');
const textareaM = ref('textarea');

const checkbox = useField(false);
const checkboxM = ref(false);

const checkboxes = useField(['John']);
const checkboxesM = ref(['John']);

const radio = useField('second');
const radioM = ref('second');

const select = useField('B');
const selectM = ref('B');
</script>
