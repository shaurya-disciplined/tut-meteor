const fs = require('fs');
const path = require('path');

const downloads = [
  { slug: "influence", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRctlIRwViarqKhpkY2T2r4-KjuYeP3sC16pirM6Rew2A&s=10" },
  { slug: "the-art-of-war", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROIvIGF-PsHB6jIUh2g7yHV2Dins1-OPmu44nVYmHTIc9cNHGhSoLSrVTb&s=10" },
  { slug: "the-master-algorithm", url: "https://m.media-amazon.com/images/I/71VhreH+DfL._UF1000,1000_QL80_.jpg" },
  { slug: "day-trading-attention", url: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1710793470i/200003642.jpg" }
];

async function download(url, slug) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(path.join('public', 'books', `${slug}.jpg`), Buffer.from(buffer));
    console.log(`Saved ${slug}.jpg`);
  } catch(e) {
    console.error(`Failed to download ${slug}: ${e.message}`);
  }
}

async function main() {
  for (const {url, slug} of downloads) {
    await download(url, slug);
  }
}
main();
