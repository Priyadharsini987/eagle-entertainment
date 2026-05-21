const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.js')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const srcDir = 'c:/Users/priya/Downloads/eagle-entertainment _ap/eagle-entertainment/frontend/src';
const files = walkSync(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace hardcoded dark backgrounds
  content = content.replace(/rgba\(5,\s*5,\s*5,\s*0\.\d+\)/g, 'var(--bg-card)');
  content = content.replace(/#0d0d0d/g, 'var(--bg-surface)');
  content = content.replace(/#141414/g, 'var(--bg-surface)');
  content = content.replace(/rgba\(0,0,0,0\.85\)/g, 'var(--bg-card)');
  content = content.replace(/rgba\(0,0,0,0\.8\)/g, 'var(--bg-card)');
  content = content.replace(/#050505/g, 'var(--bg-main)');
  content = content.replace(/#0a0a0a/g, 'var(--bg-surface)');

  // Replace hardcoded white text to use theme text colors
  content = content.replace(/color:\s*['"]#fff['"]/g, "color: 'var(--text-main)'");
  content = content.replace(/color:\s*['"]#ffffff['"]/g, "color: 'var(--text-main)'");
  
  // Replace gold hardcoded borders and shadows
  content = content.replace(/rgba\(201,168,76/g, 'rgba(255,105,180');
  content = content.replace(/rgba\(212,\s*175,\s*55/g, 'rgba(255,105,180');
  content = content.replace(/#c9a84c/g, 'var(--primary)');
  
  // Replace dark grays for muted text
  content = content.replace(/color:\s*['"]#555['"]/g, "color: 'var(--text-muted)'");
  content = content.replace(/color:\s*['"]#888['"]/g, "color: 'var(--text-muted)'");
  content = content.replace(/color:\s*['"]#ccc['"]/g, "color: 'var(--text-main)'");

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
});
