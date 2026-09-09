const fs = require('fs');
const html = fs.readFileSync('/Users/rajnishsinghchauhan/.gemini/antigravity-ide/brain/b87f665e-a9dc-4e38-8f71-84a8f2600ced/.system_generated/steps/230/content.md', 'utf8');

const linkRegex = /href="(https:\/\/goodwinbatteries\.in\/[^"]+)"/g;
let match;
const links = new Set();
while ((match = linkRegex.exec(html)) !== null) {
  links.add(match[1]);
}

console.log(Array.from(links));
