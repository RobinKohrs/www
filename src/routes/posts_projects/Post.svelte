<script>
	let { date, title, children } = $props();
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h2>{title}</h2>

<span class="date">{date.toLocaleString()}</span>

{@render children()}
<p>
	<a href="/">All Posts</a>
</p>
