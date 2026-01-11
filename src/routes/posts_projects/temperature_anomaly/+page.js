/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await fetch('/api/climate-anomaly').then((r) => {
		return r.json();
	});
	console.log(res);
	return { res };
	return {
		streamed: {
			items: fetch('/api/climate-anomaly')
		}
	};
}
