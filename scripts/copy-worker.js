const fs = require('fs');
const path = require('path');

try {
  const buildDir = path.join(process.cwd(), 'node_modules', 'pdfjs-dist', 'build');
  const workerFile = path.join(buildDir, 'pdf.worker.min.mjs');
  const targetDir = path.join(process.cwd(), 'public');
  const targetFile = path.join(targetDir, 'pdf.worker.min.mjs');

  if (fs.existsSync(workerFile)) {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.copyFileSync(workerFile, targetFile);
    console.log(`[copy-worker] Successfully copied pdf.worker.min.mjs to public/`);
  } else {
    console.warn(`[copy-worker] Worker file not found at ${workerFile}`);
  }
} catch (err) {
  console.error('[copy-worker] Error copying worker:', err);
}
