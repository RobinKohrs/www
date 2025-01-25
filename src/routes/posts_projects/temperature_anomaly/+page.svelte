<script module>
	import Post from '../Post.svelte';

	// import something
	import SVG from '$lib/SVG.svelte';

	export let date = new Date('2025-01-01');
	export let title = 'test title';
</script>

<script>
	let { data } = $props();
	console.log(data);
</script>

<Post {title} {date}>
	<br />
	{data.data}
</Post>
