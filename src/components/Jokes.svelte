<script lang="ts">
	const jokes = [
		'I quit my position as a scuba diving instructor the first day at my job.\n Deep down, I realized it wasn’t for me.',
		"I went for the job interview and the interviewer said they are looking for somebody who is responsible....I said 'I'm your guy!'They asked why...\n'Well at my old job if something went wrong, something went missing or somebody got hurt, they always said I was responsible'",
		'Why did the electrician choose a career in the power industry?\n He wanted to light up the world.',
		'Why did the lawyer choose a career in the legal field?\n He wanted to make a case for himself.'
	];

	const jokeElement = document.querySelector('.fancy-text.text-4xl');

	const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
</script>
