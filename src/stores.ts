import { writable } from 'svelte/store';
import { questions } from './data';

export type Chat = {
	qa: 'q' | 'a';
	content: string;
};

export const chats = writable<Chat[]>([]);
let qIdx = 0;

export function nextQuestion() {
	chats.update((value) => {
		value.push({ qa: 'q', content: questions[qIdx] });
		value.push({ qa: 'a', content: 'Bob Loblaw' });
		qIdx += 1;
		return value;
	});
}
