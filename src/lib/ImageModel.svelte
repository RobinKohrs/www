<script>
	let { image_high, image_mid, image_low } = $props();
	$inspect(image_low)
</script>

{#if image_high || image_low || image_mid}
	<div class="image-container">
	<img class="image" src={image_low} loading="lazy" alt="" width="200" height="200">	
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
		cursor: pointer;
		filter: blur(2px);
		border-radius: 100vw;
		opacity: 0.8;
		cursor: pointer;
		transition: filter 1.5s;
		box-shadow: none;
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
