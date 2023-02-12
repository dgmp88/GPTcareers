<script lang="ts">
	export let text: string;
	export let done: () => void;
	export let debug: boolean;
	export let size = 'text-4xl';
	let currentText = '';
	let idx = 0;
	const next = () => {
		idx += 1;
		currentText = text.slice(0, idx);
		if (idx <= text.length) {
			setTimeout(next, debug ? 0 : 60 + (Math.random() > 0.8 ? 200 : 0));
		} else {
			done();
		}
	};
	next();
</script>

<div
	class={`
    p-2 ${size}
	w-fit mx-auto
	bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary`}
>
	{currentText}
</div>
