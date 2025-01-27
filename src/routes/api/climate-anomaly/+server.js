// src/routes/api/weather-data.json.js
import Papa from 'papaparse';

export async function GET() {
	const url =
		'https://sites.ecmwf.int/data/climatepulse/data/series/era5_daily_series_2t_global.csv';

	try {
		const res = await fetch(
			'https://sites.ecmwf.int/data/climatepulse/data/series/era5_daily_series_2t_global.csv'
		).then((r) => r.text());
		const { data } = Papa.parse(res, { header: true });

		// Return the parsed data as JSON
		return new Response(JSON.stringify(data), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}
