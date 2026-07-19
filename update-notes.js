const fs = require('fs');
let content = fs.readFileSync('src/data/books.ts', 'utf8');

const updates = {
  "the-compound-effect": "read",
  "getting-things-done": "read",
  "hyperfocus": "read",
  "the-subtle-art": "read",
  "the-rudest-book-ever": "read",
  "the-alchemist": "read",
  "the-millionaire-fastlane": "read",
  "the-psychology-of-money": "read",
  "100m-leads": "read",
  "just-keep-buying": "read",
  "build-dont-talk": "read",
  "100m-offers": "read",
  "how-to-get-rich": "read",
  "how-to-win-friends": "read",
  "the-art-of-war": "read",
  "the-almanack-of-naval-ravikant": "currently reading"
};

for (const [slug, note] of Object.entries(updates)) {
  const blockStart = content.indexOf(`slug: "${slug}"`);
  if (blockStart === -1) continue;
  
  const categoryIndex = content.indexOf('category: ', blockStart);
  const nextLineAfterCategory = content.indexOf('\n', categoryIndex);
  
  const chunk = content.substring(nextLineAfterCategory, nextLineAfterCategory + 150);
  const existingNoteMatch = chunk.match(/^\s*note:\s*".*",/m);
  
  if (existingNoteMatch) {
    const replaceStart = nextLineAfterCategory + existingNoteMatch.index;
    content = content.substring(0, replaceStart) + 
              existingNoteMatch[0].replace(/note:\s*".*"/, `note: "${note}"`) + 
              content.substring(replaceStart + existingNoteMatch[0].length);
  } else {
    content = content.substring(0, nextLineAfterCategory + 1) + 
              `    note: "${note}",\n` + 
              content.substring(nextLineAfterCategory + 1);
  }
}

fs.writeFileSync('src/data/books.ts', content, 'utf8');
console.log("Updated books.ts");
