/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const posts_paths = Object.keys(import.meta.glob('/src/routes/posts_projects/*/+page.svelte'));

	const unsorted_posts = await Promise.all(
		posts_paths.map(async (path) => {
			const link = path.split('/').at(-2) ?? '';
			const component = await import(`../../routes/posts_projects/${link}/+page.svelte`);
			console.log(component);
			const { title, date } = component;
			return { title, date, link };
		})
	);
	return { unsorted_posts };
}
