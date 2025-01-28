<script module>
	import Post from '../Post.svelte';

	// import something
	import SVG from '$lib/SVG.svelte';

	export let date = new Date('2025-01-01');
	export let title = 'test title';
</script>

<script>
	let { data } = $props();
	console.log('data', data.res.slice(0,2));
</script>

<Post {title} {date}>
	<br />
	{JSON.stringify(data.res.slice(0,2))}
</Post>
