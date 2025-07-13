// src/routes/+page.server.js

import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		// Construct the full path to the static file
		const filePath = path.join(process.cwd(), 'static', 'articles.html');

		// Check if file exists
		if (!fs.existsSync(filePath)) {
			return { articles: [] };
		}

		// Read the HTML content from the file
		const htmlContent = fs.readFileSync(filePath, 'utf-8');

		// Load the HTML into Cheerio
		const $ = cheerio.load(htmlContent);

		// Get all articles and check their data-type
		const allArticles = $('article');
		const articles = [];

		allArticles.each((index, element) => {
			const articleEl = $(element);
			const dataType = articleEl.attr('data-type');

			// Only process articles with data-type="story"
			if (dataType === 'story') {
				const title = articleEl.find('h3.teaser-title').text().trim();
				const subtitle = articleEl.find('p.teaser-subtitle').text().trim();
				const kicker = articleEl.find('p.teaser-kicker').text().trim();
				const link = articleEl.find('a').attr('href');
				const image = articleEl.find('img').attr('data-lazy-src');

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
