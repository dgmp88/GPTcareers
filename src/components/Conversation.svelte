<script lang="ts">
	import type { Chat } from '../types';
	export let chats: Chat[];
</script>

<div class="overflow-y-auto p-1">
	{#each chats as chat}
		<div class="chat {chat.qa == 'a' ? 'chat-end' : 'chat-start'} transition-opacity">
			<div
				class="
				chat-bubble transition-opacity {chat.qa == 'a' ? 'chat-bubble-secondary' : 'chat-bubble-primary'}
				bg-opacity-50
				animate-fade-in
				"
			>
				{chat.content}
			</div>
		</div>
	{/each}
</div>
