const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dirPath = './images'; // Path to the directory with images
const outputDir = './webp'; // Output directory for WebP images

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

fs.readdirSync(dirPath).forEach(file => {
    const filePath = path.join(dirPath, file);
    const outputFile = path.join(outputDir, path.parse(file).name + '.webp');
    
    sharp(filePath)
        .webp()
        .toFile(outputFile, (err, info) => {
            if (err) {
                console.error(`Error converting ${file}:`, err);
            } else {
                console.log(`Converted ${file} to WebP`);
            }
        });
});
