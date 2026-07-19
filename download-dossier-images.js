const fs = require('fs');
const path = require('path');

const images = [
  { slug: "hero-new", url: "https://images.unsplash.com/photo-1517594422361-5e18237c95e1?q=80&w=2000&auto=format&fit=crop" },
  { slug: "forts-new", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop" },
  { slug: "gloves-new", url: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2000&auto=format&fit=crop" },
  { slug: "drift-new", url: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2000&auto=format&fit=crop" }
];

async function download(url, slug) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(path.join('public', 'dossier', `${slug}.jpg`), Buffer.from(buffer));
    console.log(`Saved ${slug}.jpg`);
  } catch(e) {
    console.error(`Failed to download ${slug}: ${e.message}`);
  }
}

async function main() {
  for (const {url, slug} of images) {
    await download(url, slug);
  }
}
main();
