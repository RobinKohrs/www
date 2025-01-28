// src/routes/api/climate-anomaly
import { json } from '@sveltejs/kit';
import * as d3 from 'd3';
import axios from 'axios';
export async function GET() {
	const csvUrl =
		'https://sites.ecmwf.int/data/climatepulse/data/series/era5_daily_series_2t_global.csv';

	// fetch the data with axios
	const response = await axios.get(csvUrl, { responseType: 'blob' });

	// get the data
	const file = response.data;
	const startIndex = file.indexOf('date,2t,clim');
	const text_data = file.slice(startIndex);
	const result = csvJSON(text_data);

	let processedData = result.map((d) => {
		const fullDate = parseDate(d.date);
		return {
			year: +formatYear(fullDate), // Extract the year
			date: fullDate, // Original date
			displayDate: parseYear2000(`2000-${toYear2000(fullDate)}`), // Convert to year 2000
			t2: parseFloat(d['2t']),
			clim: parseFloat(d['clim_91-20'])
		};
	});

	// Group the data by year for multiple lines
	let groupedData = d3.group(processedData, (d) => d.year);

	return json(groupedData);
}

function csvJSON(csvStr) {
	var lines = csvStr.split('\n');
	var result = [];

	// NOTE: If your columns contain commas in their values, you'll need
	// to deal with those before doing the next step
	// (you might convert them to &&& or something, then covert them back later)
	// jsfiddle showing the issue https://jsfiddle.net/
	// forgot to add the stackoverflow url for this solution
	var headers = lines[0].split(',');

	for (var i = 1; i < lines.length; i++) {
		var obj = {};
		var currentline = lines[i].split(',');

		for (var j = 0; j < headers.length; j++) {
			obj[headers[j]] = currentline[j];
		}

		result.push(obj);
	}
	return result;
}

// Process the data
const parseDate = d3.timeParse('%Y-%m-%d');
const toYear2000 = d3.timeFormat('%m-%d'); // Format for month and day
const parseYear2000 = d3.timeParse('%Y-%m-%d');

const formatYear = d3.timeFormat('%Y');
