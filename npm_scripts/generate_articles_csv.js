import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

console.log('Starting CSV generation for articles...');

try {
	// Try multiple possible paths for the file
	const possiblePaths = [
		path.join(process.cwd(), 'static', 'articles.html'),
		path.join(process.cwd(), '..', 'static', 'articles.html'),
		path.join(process.cwd(), '..', '..', 'static', 'articles.html'),
		'/app/static/articles.html',
		'/var/www/static/articles.html',
		'/tmp/vercel/static/articles.html',
		'/tmp/vercel/output/static/articles.html',
		path.join(process.cwd(), '.vercel', 'output', 'static', 'articles.html')
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

		console.log('No articles file found, exiting');
		process.exit(1);
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

	// Generate CSV content manually
	const headers = ['title', 'subtitle', 'kicker', 'link', 'image'];
	const csvRows = [headers.join(',')];

	articles.forEach((article) => {
		const row = [
			`"${article.title.replace(/"/g, '""')}"`,
			`"${article.subtitle.replace(/"/g, '""')}"`,
			`"${article.kicker.replace(/"/g, '""')}"`,
			`"${article.link.replace(/"/g, '""')}"`,
			`"${(article.image || '').replace(/"/g, '""')}"`
		];
		csvRows.push(row.join(','));
	});

	const csvContent = csvRows.join('\n');

	// Write CSV to file in static directory
	const outputPath = path.join(process.cwd(), 'static', 'articles_data.csv');
	fs.writeFileSync(outputPath, csvContent, 'utf-8');

	console.log(`CSV file generated successfully at: ${outputPath}`);
	console.log(`Total articles exported: ${articles.length}`);

	// Also log the first few articles as a preview
	console.log('\nFirst 3 articles preview:');
	articles.slice(0, 3).forEach((article, index) => {
		console.log(`${index + 1}. ${article.title}`);
		console.log(`   Link: ${article.link}`);
		console.log(`   Image: ${article.image || 'No image'}`);
		console.log('');
	});
} catch (error) {
	console.error('Error generating CSV:', error);
	process.exit(1);
}
