const fs = require('fs');
const path = require('path');

const downloads = [
  { slug: "the-power-of-your-subconscious-mind", url: "https://fingerprintpublishing.com/cache/public/uploads/books/9789389717341.jpg-544x550.jpg" },
  { slug: "getting-things-done", url: "https://m.media-amazon.com/images/I/71B4ln9+X+L._AC_UF1000,1000_QL80_.jpg" },
  { slug: "deep-work", url: "https://m.media-amazon.com/images/I/31O7mZRFFGL._SY445_SX342_FMwebp_.jpg" },
  { slug: "meditations", url: "https://m.media-amazon.com/images/I/81DFDGzHZqL._AC_UF1000,1000_QL80_.jpg" },
  { slug: "the-courage-to-be-disliked", url: "https://m.media-amazon.com/images/I/41h1AktRBmL._SY445_SX342_FMwebp_.jpg" },
  { slug: "your-erroneous-zones", url: "https://s3.amazonaws.com/static.e-junkie.com/products/mid-images/1730548-1.jpeg" },
  { slug: "kaizen", url: "https://m.media-amazon.com/images/I/41rymc4pzwL._SY445_SX342_FMwebp_.jpg" },
  { slug: "the-rudest-book-ever", url: "https://m.media-amazon.com/images/I/51mR4nQsP-L._SY445_SX342_FMwebp_.jpg" },
  { slug: "the-richest-man-in-babylon", url: "https://m.media-amazon.com/images/I/71PxZSoUitL._UF1000,1000_QL80_.jpg" },
  { slug: "the-personal-mba", url: "https://m.media-amazon.com/images/I/719QND5x-vL._UF350,350_QL50_.jpg" },
  { slug: "the-intelligent-investor", url: "https://m.media-amazon.com/images/I/41lEt54JSjL._SY445_SX342_FMwebp_.jpg" },
  { slug: "inside-steves-brain", url: "https://m.media-amazon.com/images/I/715z7hE98ZL._SL1500_.jpg" },
  { slug: "100m-money-models", url: "https://m.media-amazon.com/images/I/71bX3bMYN8L._UF1000,1000_QL80_.jpg" },
  { slug: "secrets-of-closing-the-sale", url: "https://m.media-amazon.com/images/I/61O0jxWzIyL._SL1200_.jpg" },
  { slug: "how-to-win-friends", url: "https://m.media-amazon.com/images/I/71vK0WVQ4rL._SL1500_.jpg" }
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
