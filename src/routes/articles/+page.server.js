// src/routes/+page.server.js

import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	console.log('Articles page load function started');

	try {
		// Try multiple possible paths for the file
		const possiblePaths = [
			path.join(process.cwd(), 'static', 'articles.html'),
			path.join(process.cwd(), 'static', 'articles.html'),
			path.join(process.cwd(), '..', 'static', 'articles.html'),
			path.join(process.cwd(), '..', '..', 'static', 'articles.html'),
			'/app/static/articles.html', // Common deployment path
			'/var/www/static/articles.html' // Another common deployment path
		];

		let filePath = null;
		let htmlContent = null;

		for (const testPath of possiblePaths) {
			console.log('Trying path:', testPath);
			if (fs.existsSync(testPath)) {
				filePath = testPath;
				console.log('Found file at:', filePath);
				break;
			}
		}

		// Check if file exists
		if (!filePath) {
			console.log('File not found in any of the expected locations');
			console.log('Current working directory:', process.cwd());
			console.log('Available files in static directory:');
			try {
				const staticDir = path.join(process.cwd(), 'static');
				if (fs.existsSync(staticDir)) {
					const files = fs.readdirSync(staticDir);
					console.log('Files in static directory:', files);
				}
			} catch (e) {
				console.log('Could not read static directory:', e.message);
			}

			// Return test data to verify the page structure works
			console.log('Returning test data for debugging');
			return {
				articles: [
					{
						title: 'Test Article 1',
						subtitle: 'This is a test subtitle',
						kicker: 'Test',
						link: 'https://example.com',
						image: 'https://via.placeholder.com/300x200'
					},
					{
						title: 'Test Article 2',
						subtitle: 'Another test subtitle',
						kicker: 'Test',
						link: 'https://example.com',
						image: 'https://via.placeholder.com/300x200'
					}
				]
			};
		}

		console.log('File exists, reading content...');
		// Read the HTML content from the file
		htmlContent = fs.readFileSync(filePath, 'utf-8');
		console.log('HTML content length:', htmlContent.length);

		// Load the HTML into Cheerio
		const $ = cheerio.load(htmlContent);

		// Get all articles and check their data-type
		const allArticles = $('article');
		console.log('Total articles found:', allArticles.length);

		const articles = [];

		allArticles.each((index, element) => {
			const articleEl = $(element);
			const dataType = articleEl.attr('data-type');
			console.log(`Article ${index + 1} data-type:`, dataType);

			// Only process articles with data-type="story"
			if (dataType === 'story') {
				const title = articleEl.find('h3.teaser-title').text().trim();
				const subtitle = articleEl.find('p.teaser-subtitle').text().trim();
				const kicker = articleEl.find('p.teaser-kicker').text().trim();
				const link = articleEl.find('a').attr('href');
				const image = articleEl.find('img').attr('data-lazy-src');

				console.log(`Processing story article ${index + 1}:`, {
					title,
					subtitle,
					kicker,
					link,
					image
				});

				if (title && link) {
					articles.push({
						title,
						subtitle,
						kicker,
						link: link.startsWith('/') ? `https://www.derstandard.at${link}` : link,
						image
					});
				}
			}
		});

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
