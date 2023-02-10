import { start, finish } from './prompts';
import type { Chat } from './types';

export async function getResults(chats: Chat[]) {
	let prompt = start;
	for (const { qa, content } of chats) {
		prompt += `${qa == 'q' ? 'Coach' : 'Student'}: ${content}\n`;
	}
	prompt += finish;

	console.log('prompt', prompt);
	const body = {
		model: 'text-davinci-003',
		prompt,
		temperature: 0.01,
		max_tokens: 1024,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0
	};

	const token = 'sk-1nls7yIhgEZ9lLcuaD7xT3Blb';
	const token2 = 'aakFJTjeF6Pk7rkHTP5JrqPMx';
	const url = 'https://api.openai.com/v1/completions';
	return prompt;
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}${token2.slice(2)}`
		},
		body: JSON.stringify(body)
	});
	const data = await response.json();
	return data['choices'][0].text;
}
