<script>
	let { image_high, image_mid, image_low } = $props();

	let showModal = $state(false);

	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}

	// Close modal when Escape key is pressed
	function handleKeydown(event) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}
</script>

{#if image_high || image_low || image_mid}
	<div class="image-container">
		<img
			class="image"
			src={image_low}
			loading="lazy"
			alt=""
			width="200"
			height="200"
			on:click={openModal}
		/>
		<div class="image-fade pointer-events-none absolute inset-0 dt:hidden"></div>
	</div>
{/if}

<!-- Modal -->
{#if showModal}
	<div class="modal-overlay" on:click={closeModal} on:keydown={handleKeydown} tabindex="0">
		<div class="modal-content" on:click|stopPropagation>
			<button class="close-button" on:click={closeModal}>×</button>
			<img class="modal-image" src={image_high || image_mid || image_low} alt="" />
		</div>
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
		transition: filter 0.3s;
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

	/* Modal styles */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(10px);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 99999;
		cursor: pointer;
	}

	.modal-content {
		position: relative;
		max-width: 90vw;
		max-height: 90vh;
		cursor: default;
		background: white;
		border-radius: 8px;
		padding: 20px;
	}

	.modal-image {
		display: block;
		max-width: 100%;
		max-height: 80vh;
		object-fit: contain;
		border-radius: 8px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}

	.close-button {
		position: absolute;
		top: -40px;
		right: 0;
		background: var(--color-text);
		color: white;
		border: none;
		border-radius: 50%;
		width: 30px;
		height: 30px;
		font-size: 20px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color 0.2s;
	}

	.close-button:hover {
		background: #6b4a6a;
	}
</style>
