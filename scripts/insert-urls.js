const fs = require('fs');
const path = require('path');

const paths = [
  'packages/mobile/src/components/AboutPage.js',
  'docs/README.md'
];

const replacements = {
  'WOUND_APP_URL': 'https://niyas-j.github.io/WoundScan/',
  'MEDSCAN_URL': 'https://niyas-j.github.io/MedicineScan/'
};

paths.forEach(filePath => {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    Object.entries(replacements).forEach(([placeholder, url]) => {
      content = content.replace(new RegExp(placeholder, 'g'), url);
    });
    
    fs.writeFileSync(fullPath, content);
    console.log(`Updated URLs in ${filePath}`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
});

console.log('URL insertion completed!');
