<script lang="ts">
	export let submitResponse: (value: string) => void;

	import { tick } from 'svelte';
	let value: string = '';
	let textAreaElement: HTMLTextAreaElement;
	const textFocus = async () => {
		await tick();
		textAreaElement.focus();
	};

	textFocus();

	$: value = ''; // text value
	$: submitDisabled = value.length === 0;
</script>

<div class="pt-4 pb-2">
	<label class="animate-fade-in">
		<textarea
			class="textarea bg-opacity-80 w-full"
			placeholder=""
			bind:value
			bind:this={textAreaElement}
			on:keydown={(event) => {
				if (event.key == 'Enter') submitResponse(value);
			}}
		/>
	</label>
	<button
		class="btn btn-primary float-right"
		disabled={submitDisabled}
		on:click={() => submitResponse(value)}
		class:invisible={submitDisabled}>Reply</button
	>
</div>
