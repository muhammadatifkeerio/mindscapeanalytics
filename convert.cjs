/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const dir = 'public/images/hero';
fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.png')) {
        const src = path.join(dir, file);
        const dest = path.join(dir, file.replace('.png', '.webp'));
        console.log(`Converting ${src} to ${dest}`);
        cp.execSync(`npx -y sharp-cli@2.1.1 -i "${src}" -o "${dest}" -f webp`, { stdio: 'inherit' });
    }
});
