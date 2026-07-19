const fs = require('fs');
const path = require('path');

async function download(url, slug) {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(path.join('public', 'books', `${slug}.jpg`), Buffer.from(buffer));
  console.log(`Saved ${slug}.jpg`);
}

async function main() {
  await download('https://covers.openlibrary.org/b/isbn/9781788161558-L.jpg', 'concise-laws-of-human-nature');
  await download('https://covers.openlibrary.org/b/isbn/9780451205360-L.jpg', 'the-richest-man-in-babylon');
  await download('https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg', 'the-alchemist');
}
main();
