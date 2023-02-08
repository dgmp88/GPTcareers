<script lang="ts">
	import image from '$lib/images/matt-duncan-IUY_3DvM__w-unsplash.jpg';
	import TypedText from '../components/TypedText.svelte';
	import Conversation from '../components/Conversation.svelte';
	import { nextQuestion } from '../stores';
	let showChat = false;
</script>

<div
	class="w-screen h-screen bg-cover bg-center -z-10 absolute blur"
	style={`background-image: url(${image})`}
/>

<div class="grid place-content-center w-screen h-screen">
	<div class="w-96 md:w-[35rem]">
		<TypedText
			text="Find your path"
			done={() => {
				showChat = true;
				nextQuestion();
			}}
			size="text-6xl text-center pb-10"
			debug
		/>
		{#if showChat}
			<Conversation />
		{/if}
	</div>
</div>
