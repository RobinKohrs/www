<script>
	import ImageModel from '$lib/ImageModel.svelte';

	const maps = [
		{ filename: 'ticker.png', tags: [] },
		{ filename: '001.png', tags: [] },
		{ filename: '107.webp', tags: [] },
		{ filename: '13_22_world-1300w.png', tags: [] },
		{ filename: '1.png', tags: [] },
		{ filename: 'andes_sun.png', tags: [] },
		{ filename: 'betroffeneGebäudePalisades.png', tags: [] },
		{ filename: 'bw.png', tags: [] },
		{ filename: 'cafécount.png', tags: [] },
		{ filename: 'carpathian.webp', tags: [] },
		{ filename: 'centerline.png', tags: [] },
		{ filename: 'christine_schlader_1938FIGMA.png', tags: [] },
		{ filename: 'copperbelt.png', tags: [] },
		{ filename: 'danube.png', tags: [] },
		{ filename: 'detail_afp_zentrale_clipped.webp', tags: [] },
		{ filename: 'donau_no_small_rivers.png', tags: [] },
		{ filename: 'gaza_night.png', tags: [] },
		{ filename: 'gelbe_tonnen.png', tags: [] },
		{ filename: 'georgia.png', tags: [] },
		{ filename: 'gletscher_skigebiete.png', tags: [] },
		{ filename: 'hint1_001.webp', tags: [] },
		{ filename: 'hint1_213.webp', tags: [] },
		{ filename: 'howOftenWhiteChristmas.png', tags: [] },
		{ filename: 'isis.png', tags: [] },
		{ filename: 'map1.png', tags: [] },
		{ filename: 'northern_israel_21_10_long.png', tags: [] },
		{ filename: 'northern_israel_21_10.png', tags: [] },
		{ filename: 'oe_qatar.png', tags: [] },
		{ filename: 'output_133.png', tags: [] },
		{ filename: 'output_Lidia_Fire.png', tags: [] },
		{ filename: 'zypern.png', tags: [] },
		{ filename: 'penguins.png', tags: [] },
		{ filename: 'randomForest.png', tags: [] },
		{ filename: 'size_comparison_50.png', tags: [] },
		{ filename: 'su30_abs_gwl40.png', tags: [] },
		{ filename: 'thin_lines.png', tags: [] },
		{ filename: 'title_background_image_800.png.webp', tags: [] },
		{ filename: 'true_size_of_gaza_2.png', tags: [] },
		{ filename: 'true_size_of_gaza.png', tags: [] },
		{ filename: 'vergl_flächenwidmung_realnutzung.png', tags: [] },
		{ filename: 'viennaSagres.png', tags: [] },
		{ filename: 'viewshed_after_no_scale.webp', tags: [] },
		{ filename: 'viewshed.webp', tags: [] },
		{ filename: 'wien.png', tags: [] },
		{ filename: 'zoom_to_afp_desk.webp', tags: [] },
		{ filename: 'zoom_to_afp_mobile.webp', tags: [] }
	];

	const all_maps = maps.map((m) => {
		const { img_high, img_mid, img_low } = getWebPFilenames(m.filename);
		return {
			...m,
			image_high: img_high,
			image_mid: img_mid,
			image_low: img_low
		};
	});


	function getWebPFilenames(filename) {
		const baseName = filename.replace(/\.[^/.]+$/, ''); // Remove the extension
		const img_high = `maps/webp_high/${baseName}_highres.webp`; // high
		const img_mid = `maps/webp_mid/${baseName}_midres.webp`; // mid
		const img_low = `maps/webp_low/${baseName}_lowres.webp`; // low

		return { img_high, img_mid, img_low };
	}
</script>

<div
	class="maps-container grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4 dt:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
>
	{#each all_maps as map, i}
		<ImageModel image_high={map.image_high} image_low={map.image_low} image_mid={map.image_mid} />
	{/each}
</div>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	:global(:root) {
		--color-bg: #ebebeb;
		--color-text: #8d608c;
	}

	:global(body) {
		margin: 0;
		line-height: 1.5;
		height: 100vh;
		min-height: 100vh;
		box-sizing: border-box;
		background-color: var(--color-bg);
		color: var(--color-text);
		font-family: 'vollkorn', sans-serif;
	}
</style>
