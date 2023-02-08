<script lang="ts">
	export let text: string;
	export let done: () => void;
	export let debug = false;
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
	bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-violet-500`}
>
	{currentText}
</div>
