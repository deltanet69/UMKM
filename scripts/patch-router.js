const fs = require('fs');

const files = [
  'node_modules/expo-router/_ctx.web.js',
  'node_modules/expo-router/_ctx.js',
  'node_modules/expo-router/_ctx-html.js'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Always ensure the first argument is process.env.EXPO_ROUTER_APP_ROOT
    content = content.replace(/'\.\.\/\.\.\/app'/g, "process.env.EXPO_ROUTER_APP_ROOT");
    
    if (file.includes('_ctx.web.js')) {
      // Always ensure the mode is 'sync'
      content = content.replace(/process\.env\.EXPO_ROUTER_IMPORT_MODE/g, "'sync'");
      content = content.replace(/'lazy'/g, "'sync'");
    }
    
    fs.writeFileSync(file, content);
    console.log('Patched ' + file);
  }
}
