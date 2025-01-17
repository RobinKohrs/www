<script>
	const maps = [
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
</script>

<div
	class="maps-container dt:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-4"
>
	{#each maps as map, i}
		<div class="relative">
			<img
				src="maps/{map.filename}"
				alt=""
				class="aspect-square w-full object-cover blur-[3px] duration-1000 hover:blur-0 hover:transition-all"
			/>
			<div class="bg-radial-gradient-white dt:hidden pointer-events-none absolute inset-0"></div>
		</div>
	{/each}
</div>
