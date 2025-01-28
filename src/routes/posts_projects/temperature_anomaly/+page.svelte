<script module>
	import Datawrapper from './../../../lib/Datawrapper.svelte';
	import Post from '../Post.svelte';

	// import something
	// import SVG from '$lib/SVG.svelte';

	export let date = new Date('2025-01-28');
	export let title = 'Klimaanomalien';
</script>

<script>
	let { data } = $props();
</script>

<Post {title} {date}>
	{#await data.streamed.items}
		<div class="container">
			<div class="globe"></div>
		</div>
	{:then items}
		<svg>
			{#each items.item as item}
				<circle cx={Math.random() * 100} cy={Math.random() * 100} r=".1"></circle>
			{/each}
		</svg>
	{/await}
	<!-- {#if data_final}
		<svg>
			{#each data_final as item}
				<circle cx={Math.random() * 100} cy={Math.random() * 100} r=".1"></circle>
			{/each}
		</svg>
	{:else}
		<div class="container">
			<div class="globe"></div>
		</div>
	{/if} -->
</Post>

<style>
	/* Container for the globe */
	.container {
		display: flex;
		justify-content: start;
		padding: 1rem 0;
	}

	/* Globe styling */
	.globe {
		/* width: 100%; */
		width: 70px;
		height: 70px;
		background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Earth_Western_Hemisphere_transparent_background.png/1024px-Earth_Western_Hemisphere_transparent_background.png')
			no-repeat center center;
		background-size: cover;
		border-radius: 50%;
		box-shadow: 0 0 20px rgba(0, 0, 255, 0.7);
		animation: spin 20s linear infinite;
	}

	/* Animation for spinning */
	@keyframes spin {
		0% {
			transform: rotate(0deg);
			/* background-position: 20%; */
		}
		100% {
			/* background-position: 60%; */
			transform: rotate(360deg);
		}
	}
</style>
