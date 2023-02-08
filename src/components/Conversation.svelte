<script lang="ts">
	import type { Chat } from '../stores';

	let awaitingResponse = true;

	let chats: Chat[] = [{ qa: 'q', content: "What's your path?" }];

	let value = ''; // text value
	$: submitDisabled = value.length === 0;

	const submitResponse = () => {
		chats = [...chats, { qa: 'a', content: value }];
		value = '';
		awaitingResponse = false;
	};
</script>

{#each chats as chat}
	<div class="chat {chat.qa == 'q' ? 'chat-start' : 'chat-end'} transition-opacity">
		<div
			class="
				chat-bubble transition-opacity {chat.qa == 'q' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}
				bg-opacity-50"
		>
			{chat.content}
		</div>
	</div>
{/each}
<div class="py-4">
	<label class:invisible={!awaitingResponse}>
		<textarea
			class="textarea w-full bg-opacity-80"
			placeholder=""
			disabled={!awaitingResponse}
			bind:value
		/>
	</label>
	<button
		class="btn btn-primary float-right"
		disabled={submitDisabled}
		on:click={submitResponse}
		class:invisible={submitDisabled}>Button</button
	>
</div>
