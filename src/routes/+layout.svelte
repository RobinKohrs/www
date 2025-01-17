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
		}
	];
</script>

<section class="frontpage">
	<div
		class="frontpage-info dt:min-h-screen dt:border-r-2 dt:border-b-0 relative flex flex-col border-b-2 p-4"
	>
		<div class="sticky top-[1rem]">
			<span class="dt:mb-4 text-xl font-bold"><a href="/">Robin Kohrs</a></span>
			<div class="routes dt:flex-col flex justify-end gap-2">
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

	@media (min-width: 700px) {
		.frontpage {
			grid-template-columns: auto 1fr;
		}
	}
</style>
