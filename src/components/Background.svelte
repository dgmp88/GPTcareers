<script lang="ts">
	// import src from '$lib/images/matt-duncan-IUY_3DvM__w-unsplash.jpg';
	import src from '$lib/images/rect.svg';
</script>

<div class="w-screen h-screen -z-10 fixed" />

<!-- <img class="w-screen h-screen object-cover -z-10 fixed" {src} alt="Background" /> -->

<!-- <div class="w-screen h-screen absolute top-0 left-0 -z-10 ">
	<svg preserveAspectRatio="xMidYMid slice" viewBox="0 0 1000 1000">
		<rect
			x="0"
			y="0"
			width="100%"
			height="100%"
			style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9"
		/>

		<defs>
			<radialGradient
				id="GradientReflect"
				cx="0.5"
				cy="0.5"
				r="0.4"
				fx="0.75"
				fy="0.75"
				spreadMethod="reflect"
			>
				<stop offset="0%" stop-color="red" />
				<stop offset="100%" stop-color="blue" />
			</radialGradient>
		</defs>

		<rect width="100%" height="100%" fill="url(#GradientReflect)" />
	</svg>
</div>

<svg width="220" height="220" version="1.1" xmlns="http://www.w3.org/2000/svg" /> -->
<style>
	div {
		background: radial-gradient(circle at 50% 0, rgb(255, 198, 198), rgba(112, 75, 75, 0) 70.71%),
			radial-gradient(circle at 6.7% 75%, rgb(207, 207, 255), rgba(255, 0, 0, 0) 70.71%),
			radial-gradient(circle at 93.3% 75%, rgb(219, 255, 219), rgba(0, 255, 0, 0) 70.71%);
	}
</style>
