<script>
	let { image_path, image_path_lowres } = $props();
</script>

{#if image_path || image_path_lowres}
	<div class="image-container">
		<div
			onclick={() => console.log('image clicked')}
			style="background-image: url({image_path}), url({image_path_lowres});"
			class="image"
		></div>

		<div class="image-fade pointer-events-none absolute inset-0 dt:hidden"></div>
	</div>
{/if}

<style>
	.image-container {
		position: relative;
		border-radius: 5px;
	}
	.image {
		width: 100%;
		aspect-ratio: 1;
		background-repeat: no-repeat, no-repeat;
		background-size: cover, cover;
		background-position: center, center;
		cursor: pointer;
		filter: blur(2px);
		border-radius: 100vw;
		opacity: 0.8;
		cursor: pointer;
		transition: filter 0.2s;
		border: none;
	}
	.image:hover {
		filter: none;
		opacity: 1;
		box-shadow: 0px 0px 20px 4px var(--color-text);
	}

	/*for the desktop only*/
	.image-fade {
		background: radial-gradient(circle, transparent, var(--color-bg) 82%);
		border-radius: 100vw;
		scale: 1.05;
	}
</style>
