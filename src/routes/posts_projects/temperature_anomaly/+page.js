import Papa from 'papaparse';
/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await fetch(
		'https://sites.ecmwf.int/data/climatepulse/data/series/era5_daily_series_2t_global.csv'
	).then((r) => r.text());
	const { data } = Papa.parse(res, { header: true });
	return { data };
}
