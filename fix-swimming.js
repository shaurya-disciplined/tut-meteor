const fs = require('fs');
const https = require('https');
const path = require('path');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Status: ' + res.statusCode));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', reject);
  });
};

async function main() {
  const dest = path.join('public', 'dossier', 'swimming.jpg');
  // Highly reliable Unsplash URL for dark swimming pool
  await download('https://images.unsplash.com/photo-1519315901367-f34f915de626?q=80&w=2000&auto=format&fit=crop', dest);
  console.log('Swimming image downloaded successfully!');
}

main().catch(console.error);
