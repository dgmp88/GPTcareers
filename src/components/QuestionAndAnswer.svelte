<script lang="ts">
	import TypedText from '../components/TypedText.svelte';
	export let question: string;
	export let done: () => void;
	const showAnswer = {};
</script>

<TypedText text={question} done={() => {}} />
