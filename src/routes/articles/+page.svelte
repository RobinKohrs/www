<script>
	const { data } = $props();
</script>

{#each data.data as article}
	<div>
		<a target="_blank" href={article.link}>{article.title}</a>
	</div>
{/each}
