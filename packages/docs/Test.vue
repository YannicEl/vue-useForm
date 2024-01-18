<template>
	<UForm :form="form" class="grid! grid-cols-2 gap-4">
		<!-- text -->
		<label class="v-label">
			{{ form.values.text }}
			<UInput type="text" name="text" />
		</label>

		<label class="v-label">
			{{ text }}
			<input class="v-input" type="text" v-model="text" />
		</label>

		<!-- textarea -->
		<label class="v-label">
			{{ form.values.textarea }}
			<UTextarea name="textarea"></UTextarea>
		</label>

		<label class="v-label">
			{{ textarea }}
			<textarea class="v-input" v-model="textarea"></textarea>
		</label>

		<!-- checkbox -->
		<label class="v-label">
			{{ form.values.checkbox }}
			<UInput type="checkbox" name="checkbox" />
		</label>

		<label class="v-label">
			{{ checkbox }}
			<input class="v-input" type="checkbox" v-model="checkbox" />
		</label>

		<!-- checkboxes -->
		<div>
			{{ form.values.checkboxes }}
			<div class="flex">
				<label class="v-label">
					<UInput type="checkbox" name="checkboxes" value="Jack" />
				</label>

				<label class="v-label">
					<UInput type="checkbox" name="checkboxes" value="John" />
				</label>

				<label class="v-label">
					<UInput type="checkbox" name="checkboxes" value="Mike" />
				</label>
			</div>
		</div>

		<div>
			{{ checkboxes }}
			<div class="flex">
				<label class="v-label">
					<input class="v-input" type="checkbox" value="Jack" v-model="checkboxes" />
				</label>
				<label class="v-label">
					<input class="v-input" type="checkbox" value="John" v-model="checkboxes" />
				</label>
				<label class="v-label">
					<input class="v-input" type="checkbox" value="Mike" v-model="checkboxes" />
				</label>
			</div>
		</div>

		<!-- radio -->
		<div>
			{{ form.values.radio }}
			<div class="flex">
				<label class="v-label">
					<UInput type="radio" name="radio" value="first" />
				</label>

				<label class="v-label">
					<UInput type="radio" name="radio" value="second" />
				</label>
			</div>
		</div>

		<div>
			{{ radio }}
			<div class="flex">
				<label class="v-label">
					<input class="v-input" type="radio" value="first" v-model="radio" />
				</label>
				<label class="v-label">
					<input class="v-input" type="radio" value="second" v-model="radio" />
				</label>
			</div>
		</div>

		<!-- select -->
		<label class="v-label">
			{{ form.values.select }}
			<USelect name="select">
				<option>A</option>
				<option>B</option>
				<option>C</option>
			</USelect>
		</label>

		<label class="v-label">
			{{ select }}
			<select class="v-input" v-model="select">
				<option>A</option>
				<option>B</option>
				<option>C</option>
			</select>
		</label>
	</UForm>
</template>

<script setup lang="ts">
import { UForm, UInput, useForm, USelect, UTextarea } from '@vuetils/form';
import { ref } from 'vue';

const form = useForm({
	text: ['text'],
	textarea: ['textarea'],
	checkbox: [false],
	checkboxes: [['John']],
	radio: ['second'],
	select: ['B'],
});

const text = ref('text');
const textarea = ref('textarea');
const checkbox = ref(false);
const checkboxes = ref(['John']);
const radio = ref('second');
const select = ref('B');
</script>
