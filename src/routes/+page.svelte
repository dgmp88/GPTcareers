<script lang="ts">
	import image from '$lib/images/matt-duncan-IUY_3DvM__w-unsplash.jpg';
	import TypedText from '../components/TypedText.svelte';
	import Conversation from '../components/Conversation.svelte';
	let showChat = false;
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
		}}
		size="text-6xl text-center pb-10"
		debug
	/>
	{#if showChat}
		<Conversation />
	{/if}
</div>
