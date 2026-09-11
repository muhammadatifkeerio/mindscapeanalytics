/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function run() {
    console.log("Installing sharp locally...");
    try {
        execSync('npm install sharp', { stdio: 'inherit' });
    } catch (e) {
        console.error("Installation failed, attempting to continue if sharp already exists...");
    }

    const sharp = require('sharp');
    const dirs = ['public/images/projects', 'public/images/team'];

    for (const dir of dirs) {
        if (!fs.existsSync(dir)) continue;
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                const input = path.join(dir, file);
                const output = path.join(dir, path.basename(file, ext) + '.webp');
                console.log(`Optimizing: ${input} -> ${output}`);
                try {
                    await sharp(input)
                        .webp({ quality: 80 })
                        .toFile(output);
                    fs.unlinkSync(input);
                    console.log(`Done: ${output}`);
                } catch (err) {
                    console.error(`Failed to optimize ${input}:`, err);
                }
            }
        }
    }
    console.log("Optimization complete.");
}

run().catch(console.error);
