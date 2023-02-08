<script lang="ts">
	import { tick } from 'svelte';
	import { getNextQuestion } from '../data';
	type Chat = {
		qa: 'q' | 'a';
		content: string;
	};

	let awaitingResponse = true;

	const showDebug = false;

	let chats: Chat[] = [];

	if (!showDebug) {
		chats.push({ qa: 'q', content: getNextQuestion() });
	} else {
		let chats: Chat[] = [];
		while (true) {
			let nextQ = getNextQuestion();
			if (nextQ === '' || chats.length == 1000) break;
			chats = [...chats, { qa: 'q', content: nextQ }];
			chats = [...chats, { qa: 'a', content: 'my answer' }];
		}
	}

	$: value = ''; // text value
	$: submitDisabled = value.length === 0;
	let textAreaElement: HTMLTextAreaElement;

	const textFocus = async () => {
		await tick();
		textAreaElement.focus();
	};

	textFocus();

	const submitResponse = () => {
		chats = [...chats, { qa: 'a', content: value }];
		value = '';
		const nextQ = getNextQuestion();
		if (nextQ !== '') {
			awaitingResponse = false;
			setTimeout(() => {
				chats = [...chats, { qa: 'q', content: nextQ }];
				setTimeout(() => {
					awaitingResponse = true;
					textFocus();
				}, 750);
			}, 750);
		} else {
			console.log('get ifnal response');
		}
	};
</script>

<div class="overflow-y-auto w-96 md:w-[35rem] p-1">
	{#each chats as chat}
		<div class="chat {chat.qa == 'q' ? 'chat-start' : 'chat-end'} transition-opacity">
			<div
				class="
				chat-bubble transition-opacity {chat.qa == 'q' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}
				bg-opacity-50
				animate-fade-in
				"
			>
				{chat.content}
			</div>
		</div>
	{/each}
	{#if awaitingResponse}
		<div class="pt-4 pb-2">
			<label class="animate-fade-in">
				<textarea
					class="textarea bg-opacity-80 w-full"
					placeholder=""
					disabled={!awaitingResponse}
					bind:value
					bind:this={textAreaElement}
					on:keydown={(event) => {
						if (event.key == 'Enter') submitResponse();
					}}
				/>
			</label>
			<button
				class="btn btn-primary float-right"
				disabled={submitDisabled}
				on:click={submitResponse}
				class:invisible={submitDisabled}>Reply</button
			>
		</div>
	{/if}
</div>
