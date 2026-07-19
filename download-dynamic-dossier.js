const fs = require('fs');
const path = require('path');

const images = [
  { slug: "swimming", url: "https://images.unsplash.com/photo-1519315901367-f34f915de626?q=80&w=2000&auto=format&fit=crop" },
  { slug: "volleyball", url: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=2000&auto=format&fit=crop" },
  { slug: "chess", url: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=2000&auto=format&fit=crop" },
  { slug: "guitar", url: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2000&auto=format&fit=crop" },
  { slug: "sales", url: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=2000&auto=format&fit=crop" }
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
