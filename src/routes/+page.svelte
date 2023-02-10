<script lang="ts">
	import type { Chat } from '../types';
	import image from '$lib/images/matt-duncan-IUY_3DvM__w-unsplash.jpg';
	import TypedText from '../components/TypedText.svelte';
	import Conversation from '../components/Conversation.svelte';
	import { getResults } from '../api';
	import { getNextQuestion } from '../prompts';
	import TextInput from '../components/TextInput.svelte';
	import { sleep } from '../util';

	let showChat = false;
	let awaitingResponse = false;

	const debug = false;
	let chats: Chat[] = [];
	if (debug) {
		while (true) {
			let nextQ = getNextQuestion();
			if (nextQ === '' || chats.length == 1000) break;
			chats = [...chats, { qa: 'q', content: nextQ }];
			chats = [...chats, { qa: 'a', content: 'my answer' }];
		}
		getResults(chats).then((res) => {
			chats = [...chats, { qa: 'r', content: res }];
		});
	}

	const askNextquestion = async () => {
		const nextQ = getNextQuestion();
		if (nextQ === '') {
			return true;
		}

		await sleep(750);
		chats = [...chats, { qa: 'q', content: nextQ }];
		await sleep(750);

		awaitingResponse = true;
		return false;
	};

	const submitResponse = async (value: string) => {
		chats = [...chats, { qa: 'a', content: value }];
		value = '';
		awaitingResponse = false;
		const noQsLeft = await askNextquestion();
		if (noQsLeft) {
			console.log('get final response');
		}
	};
</script>

<div
	class="w-screen h-screen bg-cover bg-center -z-10 absolute blur"
	style={`background-image: url(${image})`}
/>

<div class="grid place-content-center mx-auto h-screen">
	<TypedText
		text="Find your path"
		done={() => {
			showChat = true;
			askNextquestion();
		}}
		size="text-6xl text-center pb-10"
		{debug}
	/>
	{#if showChat}
		<Conversation {chats} />
		{#if awaitingResponse}
			<TextInput {submitResponse} />
		{/if}
	{/if}
</div>
