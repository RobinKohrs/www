<script>
	import '../app.css';
	let { children } = $props();

	const routes = [
		{
			name: 'Maps',
			url: '/maps'
		},
		{
			name: 'Articles',
			url: '/articles'
		},
		{
			name: 'Contact',
			url: '/contact'
		},
		{
			name: 'Posts/Projects',
			url: '/posts_projects'
		}
	];
</script>

<section class="frontpage">
	<div
		class="frontpage-info sticky top-0 z-10 flex flex-col border-b-2 border-gray-300 p-4 dt:relative dt:min-h-screen dt:border-b-0 dt:border-r-2"
	>
		<div class="sticky top-[1rem]">
			<span class="text-xl font-bold dt:mb-4"><a href="/">Robin Kohrs</a></span>
			<div class="routes flex justify-end gap-2 dt:flex-col">
				{#each routes as route, i}
					<a class="dt:text-lg" href={route.url}>{route.name}</a>
				{/each}
			</div>
		</div>
	</div>
	<div class="frontpage-content p-4">
		{@render children()}
	</div>
</section>

<style>
	.frontpage {
		container-type: inline-size;
		container-name: frontpage;
		min-height: 100vh;
	}

	.frontpage {
		display: grid;
		grid-template-rows: auto 1fr;
	}

	.frontpage-info {
		background-color: var(--color-bg);
	}

	@media (min-width: 1200px) {
		.frontpage {
			grid-template-columns: 1fr 5fr;
		}
	}
</style>
