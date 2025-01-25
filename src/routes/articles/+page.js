import Papa from 'papaparse';
/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await fetch(
		'https://docs.google.com/spreadsheets/d/e/2PACX-1vQx9Pwx1wLlcNAt8RFCdUt1qp0s1YCbxq8PvT8qUzDesNbyuWmOLPv0IO6lLjNSa9PLcOtRxIEvkn1L/pub?gid=0&single=true&output=csv'
	).then((r) => r.text());
	const { data } = Papa.parse(res, { header: true });
	return { data };
}
