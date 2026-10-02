// Static export so the site can be hosted on GitHub Pages
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
module.exports = { output: 'export', basePath, images: { unoptimized: true } };
