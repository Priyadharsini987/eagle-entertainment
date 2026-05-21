const fs = require('fs');
const path = 'c:/Users/priya/Downloads/eagle-entertainment _ap/eagle-entertainment/frontend/src/index.css';
let css = fs.readFileSync(path, 'utf8');

// Colors
css = css.replace(/--bg-main: #050505;/g, '--bg-main: #fff0f5;');
css = css.replace(/--bg-surface: #0a0a0a;/g, '--bg-surface: #ffe4e1;');
css = css.replace(/--bg-card: rgba\(15, 15, 15, 0\.65\);/g, '--bg-card: rgba(255, 255, 255, 0.65);');
css = css.replace(/--primary: #d4af37;.*/g, '--primary: #ff69b4; /* Hot Pink */');
css = css.replace(/--primary-light: #f3e5ab;.*/g, '--primary-light: #ffb6c1; /* Light Pink */');
css = css.replace(/--primary-dark: #aa7c11;.*/g, '--primary-dark: #ff1493; /* Deep Pink */');
css = css.replace(/--secondary: #ffffff;/g, '--secondary: #ffffff;');
css = css.replace(/--accent: #f0c243;/g, '--accent: #ff69b4;');
css = css.replace(/--text-main: #f9f9fb;/g, '--text-main: #4a4a4a;');
css = css.replace(/--text-muted: #a0a0ab;/g, '--text-muted: #ff69b4;');
css = css.replace(/--border: rgba\(212, 175, 55, 0\.15\);/g, '--border: rgba(255, 105, 180, 0.2);');
css = css.replace(/--border-hover: rgba\(212, 175, 55, 0\.35\);/g, '--border-hover: rgba(255, 105, 180, 0.4);');
css = css.replace(/--glass: rgba\(10, 10, 10, 0\.75\);/g, '--glass: rgba(255, 255, 255, 0.75);');
css = css.replace(/--glass-border: rgba\(212, 175, 55, 0\.1\);/g, '--glass-border: rgba(255, 105, 180, 0.2);');

// Replace specific RGB components for shadows and glows
css = css.replace(/212, 175, 55/g, '255, 105, 180');

// Typography colors
css = css.replace(/color: #ffffff;/g, 'color: #ff1493;');
css = css.replace(/color: #fff;/g, 'color: #ff1493;');
css = css.replace(/color: #000000;/g, 'color: #ffffff;');

// Inputs and form groups backgrounds
css = css.replace(/background: rgba\(8, 8, 8, 0\.8\);/g, 'background: rgba(255, 255, 255, 0.8);');
css = css.replace(/background: rgba\(12, 12, 12, 0\.98\);/g, 'background: rgba(255, 255, 255, 0.98);');

// Glass card hover background
css = css.replace(/background: rgba\(18, 18, 18, 0\.85\);/g, 'background: rgba(255, 255, 255, 0.95);');

// Scrollbar
css = css.replace(/background: #030303;/g, 'background: #ffe4e1;');
css = css.replace(/background: #1a1a1a;/g, 'background: #ffb6c1;');
css = css.replace(/border: 2px solid #030303;/g, 'border: 2px solid #ffe4e1;');

// Mobile bottom bar
css = css.replace(/background: rgba\(5, 5, 5, 0\.85\);/g, 'background: rgba(255, 240, 245, 0.85);');

fs.writeFileSync(path, css);
console.log('Theme changed to pookie successfully.');
