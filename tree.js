const fs = require('fs');
const path = require('path');

// Folders to exclude from the tree
const exclude = new Set([
  'node_modules',
  '.cache',
  'dist',
   '.next',
  'build',
  'out',
  '.git',
  '.vscode',
  '.github',
  // add more if you want
]);

function printTree(dir, prefix = '') {
  let items = fs.readdirSync(dir)
    .filter(item => !exclude.has(item)) // exclude folders/files here
    .sort((a, b) => a.localeCompare(b)); // sort alphabetically

  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const fullPath = path.join(dir, item);
    const isDir = fs.statSync(fullPath).isDirectory();

    console.log(prefix + (isLast ? '└── ' : '├── ') + item);

    if (isDir) {
      printTree(fullPath, prefix + (isLast ? '    ' : '│   '));
    }
  });
}

printTree('.');
