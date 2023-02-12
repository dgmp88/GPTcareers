<script lang="ts">
	import type { Chat } from '../types';
	import TypedText from '../components/TypedText.svelte';
	import Result from '../components/Result.svelte';
	import Conversation from '../components/Conversation.svelte';
	import { getResults } from '../api';
	import { questions } from '../prompts';
	import TextInput from '../components/TextInput.svelte';
	import { sleep } from '../util';
	import Background from '../components/Background.svelte';

	const debug = false;
	let showChat = false;
	let awaitingResponse = false;
	let result = '';

	let chats: Chat[] = [];
	if (debug) {
		for (let question of questions) {
			chats = [...chats, { qa: 'q', content: question }];
			chats = [...chats, { qa: 'a', content: 'my answer' }];
		}
		getResults(chats, true).then((res) => {
			result = res;
		});
	}

	let questionIndex = 0;
	const askNextquestion = async () => {
		if (questionIndex > questions.length - 1) {
			return true;
		}

		await sleep(750);
		chats = [...chats, { qa: 'q', content: questions[questionIndex] }];
		questionIndex++;
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
			console.log('hit!');
			getResults(chats, true).then((res) => {
				console.log('gotResults');
				result = res;
				console.log('result =', result);
			});
		}
	};
</script>

<Background />

<div class="flex flex-wrap justify-center  space-x-8 h-screen w-screen">
	<div class="w-full">
		<TypedText
			text="Find your path"
			done={() => {
				showChat = true;
				askNextquestion();
			}}
			size="text-6xl text-center pb-10"
			{debug}
		/>
	</div>
	{#if showChat}
		<div class="max-w-xl">
			<Conversation {chats} />
			{#if awaitingResponse}
				<TextInput {submitResponse} />
			{/if}
		</div>
	{/if}

	{#if result !== ''}
		<div class="max-w-xl">
			<Result {result} />
		</div>
	{/if}
</div>
