import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECTS_DIR = path.join(__dirname, '../public/images/projects');
const TARGET_SIZE_KB = 45; // Target slightly below 50KB to be safe

async function optimizeImages() {
    try {
        const files = fs.readdirSync(PROJECTS_DIR);

        for (const file of files) {
            const filePath = path.resolve(PROJECTS_DIR, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) continue;

            const ext = path.extname(file).toLowerCase();
            if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) continue;

            const fileName = path.parse(file).name;
            // Use _opt suffix to avoid EPERM on existing files being locked by dev server
            const targetPath = path.resolve(PROJECTS_DIR, `${fileName}_opt.webp`);

            if (file.endsWith('_opt.webp') && stats.size / 1024 < 50) {
                console.log(`- Skipping ${file} (Already optimized: ${(stats.size / 1024).toFixed(2)}KB)`);
                continue;
            }

            console.log(`+ Optimizing ${file} (${(stats.size / 1024).toFixed(2)}KB)...`);

            try {
                // Read into buffer first to release the file handle immediately
                const inputBuffer = fs.readFileSync(filePath);

                let quality = 80;
                let buffer = await sharp(inputBuffer)
                    .webp({ quality })
                    .toBuffer();

                // Iterative compression if still over 50KB
                while (buffer.length / 1024 > 50 && quality > 10) {
                    quality -= 5;
                    buffer = await sharp(inputBuffer)
                        .webp({ quality })
                        .toBuffer();
                }

                // Write to temp then rename to avoid lock issues
                const tempPath = targetPath + '.tmp';
                fs.writeFileSync(tempPath, buffer);

                // If the target is the same as the source (e.g. optimizing an existing webp),
                // we need to be careful. But writeFileSync to a .tmp is safe.
                if (fs.existsSync(targetPath) && targetPath === filePath) {
                    // For WebP files being optimized: wait a bit or just overwrite
                    // Actually, buffer is in memory, so filePath should be closable.
                }

                fs.renameSync(tempPath, targetPath);

                if (ext !== '.webp') {
                    console.log(`  -> Converted to WebP: ${(buffer.length / 1024).toFixed(2)}KB`);
                } else {
                    console.log(`  -> Re-optimized WebP: ${(buffer.length / 1024).toFixed(2)}KB`);
                }
            } catch (err) {
                console.error(`  ! Failed to process ${file}:`, err.message);
            }
        }

        console.log('\nOptimization Complete.');
    } catch (error) {
        console.error('Error during optimization:', error);
    }
}

optimizeImages();
