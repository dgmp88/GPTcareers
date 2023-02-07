<script lang="ts">
	import image from '$lib/images/matt-duncan-IUY_3DvM__w-unsplash.jpg';
	import TypedText from '../components/TypedText.svelte';
	import QuestionAndAnswer from '../components/QuestionAndAnswer.svelte';
	let question = '';

	const QUESTIONS = {
		'What are your hobbies?': {
			placeholder: 'e.g. reading, writing, gaming, cooking',
			answer: 'reading, writing, gaming, cooking'
		},
		'What are your biggest strengths?': {
			placeholder: 'e.g. maths, people skills, drawing, writing',
			answer: 'maths, people skills'
		},
		'Do you want to go to university?': {
			placeholder: 'yes/no',
			answer: 'no'
		}
	};

	let questionIndex = 0;
	console.log(questionIndex);

	function nextQuestion() {
		console.log('nextQ', questionIndex);
		// Set to empty string to force re-render
		question = '';
		let nextQ = Object.keys(QUESTIONS)[questionIndex];
		setTimeout(() => {
			question = nextQ;
		}, 100);
		questionIndex += 1;
	}
</script>

<div
	class="w-screen h-screen bg-cover bg-center -z-10 absolute blur"
	style={`background-image: url(${image})`}
/>

<div class="grid place-content-center w-screen h-screen">
	<TypedText text="Find your path" done={nextQuestion} size="text-6xl text-center" />
	{#if question}
		<QuestionAndAnswer {question} done={nextQuestion} />
	{/if}
</div>
