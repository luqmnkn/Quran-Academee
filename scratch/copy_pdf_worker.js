const fs = require('fs');
const path = require('path');

console.log("Checking pdfjs-dist build files...");

const buildDir = path.join('node_modules', 'pdfjs-dist', 'build');
if (fs.existsSync(buildDir)) {
  console.log("Files in node_modules/pdfjs-dist/build:", fs.readdirSync(buildDir));
}

const legacyDir = path.join('node_modules', 'pdfjs-dist', 'legacy', 'build');
if (fs.existsSync(legacyDir)) {
  console.log("Files in node_modules/pdfjs-dist/legacy/build:", fs.readdirSync(legacyDir));
}

// Copy worker file to public folder
let sourceWorker = '';
if (fs.existsSync(path.join(buildDir, 'pdf.worker.min.mjs'))) {
  sourceWorker = path.join(buildDir, 'pdf.worker.min.mjs');
} else if (fs.existsSync(path.join(buildDir, 'pdf.worker.min.js'))) {
  sourceWorker = path.join(buildDir, 'pdf.worker.min.js');
} else if (fs.existsSync(path.join(buildDir, 'pdf.worker.mjs'))) {
  sourceWorker = path.join(buildDir, 'pdf.worker.mjs');
}

if (sourceWorker) {
  const targetWorker = path.join('public', path.basename(sourceWorker));
  fs.copyFileSync(sourceWorker, targetWorker);
  console.log(`Successfully copied worker: ${sourceWorker} -> ${targetWorker}`);
} else {
  console.log("No matching pdf.worker file found in buildDir!");
}
