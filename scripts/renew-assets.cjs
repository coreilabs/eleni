const fs = require('node:fs');
const crypto = require('node:crypto');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const tokens = {};
for (const resource of ['assets/style.css', 'assets/app.js']) {
  const token = crypto.randomBytes(8).toString('hex');
  const escaped = resource.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  html = html.replace(new RegExp(`${escaped}\\?v=[a-zA-Z0-9]+`, 'g'), `${resource}?v=${token}`);
  tokens[resource] = token;
}
if (process.argv.includes('--og') || html.includes('OG_TOKEN')) {
  const token = crypto.randomBytes(8).toString('hex');
  html = html.replace(/assets\/opengraph\.webp\?v=[a-zA-Z0-9_]+/g, `assets/opengraph.webp?v=${token}`);
}
fs.writeFileSync(path.join(root, 'index.html'), html);
fs.writeFileSync(path.join(root, 'assets/versions.json'), JSON.stringify(tokens, null, 2) + '\n');
console.log('Tokens de publicação renovados.');
