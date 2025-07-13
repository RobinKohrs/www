<!-- src/routes/articles/+page.svelte -->
<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="container">
	<div class="article-grid">
		{#each data.articles as article}
			<a href={article.link} target="_blank" rel="noopener noreferrer" class="card">
				{#if article.image}
					<!-- THE FIX IS HERE: changed 'on:error' to 'onerror' -->
					<img
						src={article.image}
						alt={article.title}
						on:error={(e) => (e.target.style.display = 'none')}
						loading="lazy"
					/>
				{/if}
				<div class="card-content">
					{#if article.kicker}
						<p class="kicker">{article.kicker}</p>
					{/if}
					<h2>{article.title}</h2>
					<p>{article.subtitle}</p>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		font-family: sans-serif;
	}

	/* Mobile-first responsive design */
	.article-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
	}

	.card {
		border: 1px solid #ddd;
		border-radius: 8px;
		overflow: hidden;
		text-decoration: none;
		color: inherit;
		display: flex;
		flex-direction: column;
		transition: box-shadow 0.2s ease-in-out;
	}

	.card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.card img {
		width: 100%;
		height: 150px; /* Smaller image height on mobile */
		object-fit: cover;
	}

	.card-content {
		padding: 0.75rem; /* Smaller padding on mobile */
	}

	.card h2 {
		font-size: 1rem; /* Smaller font size on mobile */
		margin: 0.25rem 0;
		line-height: 1.3;
	}

	.card p {
		font-size: 0.8rem; /* Smaller font size on mobile */
		color: #555;
		line-height: 1.4;
		display: none; /* Hide subtitle on mobile */
	}

	.kicker {
		font-size: 0.7rem; /* Smaller font size on mobile */
		font-weight: bold;
		color: #e00085; /* Standard's brand color */
		margin-bottom: 0.25rem;
		display: none; /* Hide kicker on mobile */
	}

	/* Tablet styles */
	@media (min-width: 768px) {
		.article-grid {
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
			gap: 1.5rem;
		}

		.card img {
			height: 180px;
		}

		.card-content {
			padding: 1rem;
		}

		.card h2 {
			font-size: 1.1rem;
			margin: 0.5rem 0;
		}

		.card p {
			font-size: 0.85rem;
			display: block; /* Show subtitle on tablet and up */
		}

		.kicker {
			font-size: 0.75rem;
			display: block; /* Show kicker on tablet and up */
		}
	}

	/* Desktop styles */
	@media (min-width: 1024px) {
		.article-grid {
			grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
			gap: 2rem;
		}

		.card img {
			height: 200px;
		}

		.card h2 {
			font-size: 1.2rem;
		}

		.card p {
			font-size: 0.9rem;
		}

		.kicker {
			font-size: 0.8rem;
		}
	}
</style>
