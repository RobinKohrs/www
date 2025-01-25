<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();
</script>

{#each data.unsorted_posts as post}
	<a href="/posts_projects/{post.link}"> Link1 </a>
{/each}
