// src/routes/+page.server.js

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	console.log('Articles page load function started');

	try {
		// Use hardcoded path for the CSV file
		const filePath = 'static/articles_data.csv';
		console.log('Reading CSV file from:', filePath);

		// Read the CSV content from the file
		const response = await fetch(`/${filePath}`);
		if (!response.ok) {
			console.error('Failed to fetch CSV file:', response.status, response.statusText);
			return { articles: [] };
		}
		const csvContent = await response.text();
		console.log('CSV content length:', csvContent.length);

		// Parse the CSV content - handle multiline quoted fields
		const lines = csvContent.split('\n');
		const headers = lines[0].split(',').map((h) => h.replace(/"/g, ''));
		const articles = [];

		let currentLine = '';
		let inQuotes = false;
		let lineIndex = 1;

		for (let i = 1; i < lines.length; i++) {
			const line = lines[i];
			currentLine += line + '\n';

			// Count quotes in the current accumulated line
			const quoteCount = (currentLine.match(/"/g) || []).length;
			if (quoteCount % 2 === 0) {
				// We have a complete line
				const values = [];
				let current = '';
				let inQuotes = false;

				for (let j = 0; j < currentLine.length; j++) {
					const char = currentLine[j];
					if (char === '"') {
						inQuotes = !inQuotes;
					} else if (char === ',' && !inQuotes) {
						values.push(current);
						current = '';
					} else {
						current += char;
					}
				}
				values.push(current); // Add the last value

				const article = {};
				headers.forEach((header, index) => {
					let value = values[index] || '';
					// Remove quotes and clean up
					value = value.replace(/^"/, '').replace(/"$/, '').trim();
					article[header] = value;
				});
				articles.push(article);

				currentLine = '';
			}
		}

		console.log('First article sample:', articles[0]);

		console.log('Final articles array length:', articles.length);
		return {
			articles
		};
	} catch (error) {
		console.error('Error in load function:', error);
		return {
			articles: []
		};
	}
}
