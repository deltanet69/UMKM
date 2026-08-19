const fs = require('fs');
const path = require('path');

// Resolve the absolute path to app directory
const appDir = path.resolve(__dirname, '../app');
console.log('[patch-router] App directory:', appDir);
console.log('[patch-router] App dir exists:', fs.existsSync(appDir));
console.log('[patch-router] EXPO_ROUTER_APP_ROOT env:', process.env.EXPO_ROUTER_APP_ROOT);
console.log('[patch-router] NODE_ENV:', process.env.NODE_ENV);

const files = [
  'node_modules/expo-router/_ctx.web.js',
  'node_modules/expo-router/_ctx.js',
  'node_modules/expo-router/_ctx-html.js'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    // Replace process.env.EXPO_ROUTER_APP_ROOT with hardcoded relative path
    // This relative path is from node_modules/expo-router/ -> ../../app
    content = content.replace(/process\.env\.EXPO_ROUTER_APP_ROOT/g, "'../../app'");

    if (file.includes('_ctx.web.js')) {
      // Always ensure the mode is 'sync' for web bundling
      content = content.replace(/process\.env\.EXPO_ROUTER_IMPORT_MODE/g, "'sync'");
      content = content.replace(/'lazy'/g, "'sync'");
    }

    fs.writeFileSync(file, content);
    if (content !== original) {
      console.log('[patch-router] Patched: ' + file);
    } else {
      console.log('[patch-router] Already patched (no changes): ' + file);
    }
  } else {
    console.log('[patch-router] File not found (skipping): ' + file);
  }
}

console.log('[patch-router] Done.');
