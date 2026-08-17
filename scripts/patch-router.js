const fs = require('fs');

const files = [
  'node_modules/expo-router/_ctx.web.js',
  'node_modules/expo-router/_ctx.js',
  'node_modules/expo-router/_ctx-html.js'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/process\.env\.EXPO_ROUTER_APP_ROOT/g, "'../../app'");
    fs.writeFileSync(file, content);
    console.log('Patched ' + file);
  }
}
