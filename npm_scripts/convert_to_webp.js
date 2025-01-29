import sharp from 'sharp';
import fs from 'fs';
import path, { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// Resolve the project root from the npm_scripts folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootFolder = resolve(__dirname, '..'); // Adjust this if npm_scripts is deeper

// Paths for input and output
const inputFolder = path.join(rootFolder, 'static/maps/raw_maps');
const midResFolder = path.join(rootFolder, 'static/maps/webp_mid');
const highResFolder = path.join(rootFolder, 'static/maps/webp_high');
const lowResFolder = path.join(rootFolder, 'static/maps/webp_low');

// Ensure the output folders exist
if (!fs.existsSync(highResFolder)) {
	fs.mkdirSync(highResFolder, { recursive: true });
}

if (!fs.existsSync(midResFolder)) {
	fs.mkdirSync(midResFolder, { recursive: true });
}
if (!fs.existsSync(lowResFolder)) {
	fs.mkdirSync(lowResFolder, { recursive: true });
}

const convertImagesToWebP = async () => {
	try {
		const files = fs.readdirSync(inputFolder);

		for (const file of files) {
			const ext = path.extname(file).toLowerCase();
			const baseName = path.basename(file, ext);

			// Process only .png, .jpg, and .jpeg files
			if (['.png', '.webp', '.jpg', '.jpeg'].includes(ext)) {
				const inputFilePath = path.join(inputFolder, file);
				const highResOutputPath = path.join(highResFolder, `${baseName}_highres.webp`);
				const midResOutputPath = path.join(midResFolder, `${baseName}_midres.webp`);
				const lowResOutputPath = path.join(lowResFolder, `${baseName}_lowres.webp`);

				// convert to high res				
				await sharp(inputFilePath)
					.webp({ quality: 100 }) // Adjust quality as needed
					.toFile(highResOutputPath);

				// Convert to mid regular WebP
				await sharp(inputFilePath)
					.resize(300, 300) // Resize to 100x100 pixels
					.webp({ quality: 80 }) // Adjust quality as needed
					.toFile(midResOutputPath);

				console.log(`Converted: ${file} -> ${baseName}.webp`);

				// Convert to low-res WebP
				await sharp(inputFilePath)
					.resize(300, 300) // Resize to 100x100 pixels
					.webp({ quality: 40 }) // Adjust quality for low-res as needed
					.toFile(lowResOutputPath);

				console.log(`Converted: ${file} -> ${baseName}_lowres.webp`);
			}
		}

		console.log('All images have been converted to WebP and low-res WebP!');
	} catch (error) {
		console.error('Error during conversion:', error);
	}
};

convertImagesToWebP();
